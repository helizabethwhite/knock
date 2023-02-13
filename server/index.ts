import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { ClientEvents, ServerEvents } from '../src/shared/constants';
import { Category, RawCategory } from './database/models/category';
import { Item, RawItem } from './database/models/item';
import { RawUser, User } from './database/models/user';

export const app = express();
const httpServer = http.createServer(app);
export const socketServer = new Server(httpServer, {
    perMessageDeflate: false,
    cors: {
        origin: ['http://localhost:3000', 'https://knockit-app.azurewebsites.net'],
    },
});
let onlineUserIds: string[] = [];

app.use(express.json());
const corsWhitelist = ['http://localhost:3000', 'https://knockit-app.azurewebsites.net'];
app.use((req, res, next) => {
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    next();
});

export const fetchAndEmitUsers = async () => {
    const users = await User.getAll();
    socketServer.emit(
        ServerEvents.UPDATE_ALL_USERS,
        users.map((user) => ({
            ...user,
            isOnline: onlineUserIds.includes(user.id),
        }))
    );
};

app.post('/login', (req, res) => {
    const { id } = req.body;
    res.locals.userId = id;
    if (!onlineUserIds.includes(id)) {
        onlineUserIds.push(id);
        fetchAndEmitUsers();
    }
    res.status(200).send();
});

app.post('/logout', (req, res) => {
    const { userId } = res.locals;
    if (onlineUserIds.includes(userId)) {
        onlineUserIds = onlineUserIds.filter((onlineUserId) => onlineUserId !== userId);
        fetchAndEmitUsers();
    }
    res.locals.userId = null;
    res.status(200).send();
});

app.post('/users', async (req, res) => {
    const { username } = req.body;
    const user = new User({ username } as RawUser);
    await user.save();
    fetchAndEmitUsers();
    res.status(200).send();
});

socketServer.sockets.on('connection', (socket) => {
    socket.on(ClientEvents.FETCH_ALL_USERS, () => fetchAndEmitUsers());
    socket.on(ClientEvents.FETCH_ALL_CATEGORIES, () => fetchAndEmitCategories());
    socket.on(ClientEvents.FETCH_ALL_ITEMS, () => fetchAndEmitItems());
});

export const fetchAndEmitCategories = async () => {
    const categories = await Category.getAll();
    socketServer.emit(ServerEvents.UPDATE_ALL_CATEGORIES, categories);
};

app.post('/categories', async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name } as RawCategory);
    await category.save();
    fetchAndEmitCategories();
    res.status(200).send();
});

export const fetchAndEmitItems = async () => {
    const items = await Item.getAll();
    socketServer.emit(ServerEvents.UPDATE_ALL_ITEMS, items);
};

app.post('/items', async (req, res) => {
    const { title, description, creatorUserId, categoryId } = req.body;
    const item = new Item({ title, description, creatorUserId, categoryId } as RawItem);
    await item.save();
    fetchAndEmitItems();
    res.status(200).send();
});

app.post('/items/:id', async (req, res) => {
    const { id } = req.params;
    console.log('received req for item:', id, req.body);
    const item = new Item({ _id: id, ...req.body } as RawItem);
    await item.save();
    fetchAndEmitItems();
    res.status(200).send();
});

httpServer.listen(8080, function () {
    console.log('listening on *:8080');
});
