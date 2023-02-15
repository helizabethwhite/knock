import axios from 'axios';
import create from 'zustand';
import { buildRouteName, ClientEvents, ServerEvents } from '../../shared/constants';
import { CategoryModel } from '../../shared/types';
import { socket } from '../../socket';

export interface CategoryStoreState {
    categories: CategoryModel[];
    setCategories: (categories: CategoryModel[]) => void;
    createCategory: (name: string) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryStoreState>((set) => ({
    categories: [],
    setCategories: (categories: CategoryModel[]) => set({ categories }),
    createCategory: async (name: string) => {
        await axios.post(buildRouteName('/categories'), { name });
    },
    deleteCategory: async (id: string) => {
        await axios.delete(buildRouteName(`/categories/${id}`));
    },
}));

export const subscribeCategoryStoreToSocketUpdates = () => {
    socket.on(ServerEvents.UPDATE_ALL_CATEGORIES, (categories) => {
        useCategoryStore.setState({ categories });
    });
    socket.emit(ClientEvents.FETCH_ALL_CATEGORIES);
};
