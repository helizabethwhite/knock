import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { subscribeCategoryStoreToSocketUpdates } from './slices/categories/categoryStore';
import { subscribeItemStoreToSocketUpdates } from './slices/items/itemStore';
import UserSelect from './slices/users/UserSelect';
import { subscribeUserStoreToSocketUpdates, useUserStore } from './slices/users/userStore';
import TodoListApp from './TodoListApp';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
subscribeUserStoreToSocketUpdates();
subscribeCategoryStoreToSocketUpdates();
subscribeItemStoreToSocketUpdates();
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

function App() {
    const activeUserId = useUserStore((state) => state.activeUserId);
    const users = useUserStore((state) => state.users);
    const currentUser = React.useMemo(() => users.find((user) => user.id === activeUserId), [users, activeUserId]);
    console.log('Hello world');
    if (!currentUser) {
        return <UserSelect />;
    }

    return <TodoListApp currentUser={currentUser} />;
}

export default App;
