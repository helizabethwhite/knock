import React from 'react';
import Button from '../../shared/components/button/Button';
import { useUserStore } from './userStore';

const Authorization = () => {
    const users = useUserStore((state) => state.users);
    const activeUserId = useUserStore((state) => state.activeUserId);
    const logIn = useUserStore((state) => state.logIn);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const createUser = useUserStore((state) => state.createUser);
    return (
        <div className='login'>
            <div className='mb-2 flex login-input-group'>
                <label>Select User</label>
                <select
                    onChange={(event) => {
                        const userId = event.currentTarget.value === '-1' ? null : event.currentTarget.value;
                        if (userId) logIn(userId);
                    }}
                    value={activeUserId == null ? '' : activeUserId}
                >
                    {[{ id: '-1', username: 'None' }].concat(users).map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
            <form
                className='login-input-group'
                onSubmit={(event) => {
                    event.preventDefault();
                    if (inputRef.current?.value) {
                        createUser(inputRef.current.value);
                        inputRef.current.value = '';
                    }
                }}
            >
                <label>Create User</label>

                <input className='mb-2' placeholder='Username' ref={inputRef} />
                <Button content='Add' type='submit' />
            </form>
        </div>
    );
};

export default Authorization;
