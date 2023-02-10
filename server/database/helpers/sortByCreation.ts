import { BaseDbObject } from '../models/base';

export const sortByCreation = (items: BaseDbObject[]) =>
    items.slice().sort((a: { createdAt: number }, b: { createdAt: number }) => a.createdAt - b.createdAt);
