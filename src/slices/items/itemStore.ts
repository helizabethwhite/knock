import axios from 'axios';
import create from 'zustand';
import { buildRouteName, ClientEvents, ServerEvents } from '../../shared/constants';
import { ItemModel } from '../../shared/types';
import { socket } from '../../socket';

export interface ItemStoreState {
    items: ItemModel[];
    setitems: (items: ItemModel[]) => void;
    createItem: (item: ItemModel) => Promise<void>;
    updateItem: (id: string, updatedItem: Partial<ItemModel>) => Promise<void>;
}

export const useItemStore = create<ItemStoreState>((set) => ({
    items: [],
    setitems: (items: ItemModel[]) => set({ items }),
    createItem: async (item: ItemModel) => {
        await axios.post(buildRouteName('/items'), { ...item });
    },
    updateItem: async (id: string, updatedItem: Partial<ItemModel>) => {
        await axios.post(buildRouteName(`/items/${id}`), { ...updatedItem });
    },
}));

export const subscribeItemStoreToSocketUpdates = () => {
    socket.on(ServerEvents.UPDATE_ALL_ITEMS, (items) => {
        useItemStore.setState({ items });
    });
    socket.emit(ClientEvents.FETCH_ALL_ITEMS);
};
