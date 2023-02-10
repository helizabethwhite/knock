import Datastore from 'nedb-promises';
import { UserModel } from '../../../src/shared/types';
import { sortByCreation } from '../helpers/sortByCreation';
import { BaseDbObject } from './base';

const path = require('path');

const db = Datastore.create({
    filename: path.join(__dirname, '../data/users.db'),
    autoload: true,
});

export interface RawUser extends BaseDbObject {
    username: string;
    createdAt: number;
}

export class User {
    createdAt: number;
    id: string;
    username: string;

    constructor(rawUser: RawUser) {
        const { _id: id, createdAt, username } = rawUser;
        this.createdAt = !createdAt ? Date.now() : createdAt;
        this.id = id;
        this.username = username;
    }

    static async getAll(): Promise<User[]> {
        const rawUsers = await db.find<RawUser>({});
        return sortByCreation(rawUsers).map((rawUser) => new User(rawUser as RawUser));
    }

    async save() {
        return await db.update({ _id: this.id }, this.serialize(), { upsert: true });
    }

    serialize(): UserModel {
        return {
            id: this.id,
            createdAt: this.createdAt,
            username: this.username,
        };
    }
}
