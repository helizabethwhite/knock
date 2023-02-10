export interface UserModel {
    id: string;
    username: string;
    createdAt: number;
}

export interface CategoryModel {
    id: string;
    name: string;
    createdAt: number;
}

export interface ItemModel {
    id: string;
    createdAt: number;
    title: string;
    description: string;
    categoryId: string;
    creatorUserId: string;
    completed: boolean;
}
