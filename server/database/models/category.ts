import Datastore from 'nedb-promises';
import { CategoryModel } from '../../../src/shared/types';
import { sortByCreation } from '../helpers/sortByCreation';
import { BaseDbObject } from './base';

const path = require('path');

const db = Datastore.create({
    filename: path.join(__dirname, '../data/categories.db'),
    autoload: true,
});

export interface RawCategory extends BaseDbObject {
    name: string;
}

export class Category {
    createdAt: number;
    id: string;
    name: string;

    constructor(rawCategory: RawCategory) {
        const { _id: id, createdAt, name } = rawCategory;
        this.createdAt = !createdAt ? Date.now() : createdAt;
        this.id = id;
        this.name = name;
    }

    static async getAll(): Promise<Category[]> {
        return db
            .find<RawCategory>({})
            .then((rawCategories: RawCategory[]) =>
                sortByCreation(rawCategories).map((rawCategory) => new Category(rawCategory as RawCategory))
            );
    }

    static async getById(id: string): Promise<Category> {
        return db.findOne<RawCategory>({ _id: id }).then((rawCategory) => new Category(rawCategory as RawCategory));
    }

    save() {
        return db.update({ _id: this.id }, this.serialize(), { upsert: true });
    }

    serialize(): CategoryModel {
        return {
            id: this.id,
            createdAt: this.createdAt,
            name: this.name,
        };
    }
}


