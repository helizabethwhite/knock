import axios from 'axios';
import { create } from 'zustand';
import { buildRouteName, ClientEvents, LOCAL_STORAGE_USER_ID_KEY, ServerEvents } from '../../shared/constants';
import { socket } from '../../shared/socket';
import { UserModel } from '../../shared/types';

export interface UserStoreState {
    activeUserId: string;
    users: UserModel[];
    setUsers: (users: UserModel[]) => void;
    logIn: (id: string) => Promise<void>;
    logOut: () => Promise<void>;
    createUser: (username: string) => Promise<void>;
}

export const useUserStore = create<UserStoreState>((set) => ({
    activeUserId: window.localStorage.getItem(LOCAL_STORAGE_USER_ID_KEY) || '',
    users: [],
    setUsers: (users: UserModel[]) => set({ users }),
    logIn: async (id: string) => {
        await axios.post(buildRouteName('/login'), { id });
        set({ activeUserId: id });
        window.localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, id);
        socket.emit(ClientEvents.FETCH_ALL_CATEGORIES);
    },
    createUser: async (username) => {
        await axios.post(buildRouteName('/users'), { username });
    },
    logOut: async () => {
        await axios.post(buildRouteName('/logout'));
        set({ activeUserId: '' });
        window.localStorage.setItem(LOCAL_STORAGE_USER_ID_KEY, '');
    },
}));

export const subscribeUserStoreToSocketUpdates = () => {
    socket.on(ServerEvents.UPDATE_ALL_USERS, (users) => {
        useUserStore.setState({ users });
    });
    socket.emit(ClientEvents.FETCH_ALL_USERS);
};
