import { BaseDbObject } from '../models/base';

export const sortByCreation = (items: BaseDbObject[], newestFirst: boolean = false) =>
    items
        .slice()
        .sort((a: { createdAt: number }, b: { createdAt: number }) =>
            newestFirst ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
        );
