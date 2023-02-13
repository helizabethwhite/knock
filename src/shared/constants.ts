export const ClientEvents = {
    FETCH_ALL_ITEMS: 'FETCH_ALL_ITEMS',
    FETCH_ALL_CATEGORIES: 'FETCH_ALL_CATEGORIES',
    FETCH_ALL_USERS: 'FETCH_ALL_USERS',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    CREATE_USER: 'CREATE_USER',
    EDIT_ITEM: 'EDIT_ITEM',
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
};

export const ServerEvents = {
    UPDATE_ALL_ITEMS: 'UPDATE_ALL_ITEMS',
    UPDATE_ALL_CATEGORIES: 'UPDATE_ALL_CATEGORIES',
    UPDATE_ALL_USERS: 'UPDATE_ALL_USERS',
};

export const buildRouteName = (endpointSuffix: string) => `${process.env.REACT_APP_BACKEND_URL}${endpointSuffix}`;

export const LOCAL_STORAGE_USER_ID_KEY = 'USER_ID';
