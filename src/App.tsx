import React from 'react';
import './App.css';
import TodoList from './slices/categories/TodoList';
import Authorization from './slices/users/Authorization';
import { useUserStore } from './slices/users/userStore';

function App() {
    const activeUserId = useUserStore((state) => state.activeUserId);
    const users = useUserStore((state) => state.users);
    const currentUser = React.useMemo(() => users.find((user) => user.id === activeUserId), [users, activeUserId]);

    if (!currentUser) {
        return <Authorization />;
    }

    return <TodoList currentUser={currentUser} />;
}

export default App;
