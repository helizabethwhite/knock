import Datastore from 'nedb-promises';
import { sortByCreation } from '../helpers/sortByCreation';
import { BaseDbObject } from './base';
const path = require('path');

const db = Datastore.create({
    filename: path.join(__dirname, '../data/items.db'),
    autoload: true,
});

export interface RawItem extends BaseDbObject {
    title: string;
    description: string;
    categoryId: string;
    creatorUserId: string;
    completed: false;
}

export class Item {
    createdAt: number;
    id: string;
    title: string;
    description: string;
    categoryId: string;
    creatorUserId: string;
    completed: boolean;

    constructor(rawItem: RawItem) {
        const { _id: id, categoryId, title, createdAt, creatorUserId, description, completed = false } = rawItem;
        this.createdAt = createdAt == null ? Date.now() : createdAt;
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.description = description;
        this.creatorUserId = creatorUserId;
        this.completed = completed;
    }

    static async getAll(): Promise<Item[]> {
        return db
            .find<RawItem>({})
            .then((rawItems: RawItem[]) => sortByCreation(rawItems).map((rawItem) => new Item(rawItem as RawItem)));
    }

    static async getById(id: string): Promise<Item | null> {
        return db.findOne<RawItem>({ _id: id }).then((rawItem) => {
            return new Item(rawItem as RawItem);
        });
    }

    validate() {
        // if (this.content.length > Item_LIMIT) {
        //     throw new Error('Item length exceeded');
        // }
    }

    save() {
        try {
            this.validate();
            return db.update({ _id: this.id }, { $set: this.serialize() }, { upsert: true });
        } catch (e) {
            return Promise.reject(e);
        }
    }

    serialize() {
        return {
            _id: this.id,
            categoryId: this.categoryId,
            title: this.title,
            description: this.description,
            createdAt: this.createdAt,
            creatorUserId: this.creatorUserId,
            completed: this.completed,
        };
    }
}
