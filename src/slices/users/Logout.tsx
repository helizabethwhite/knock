import React from 'react';
import Button from '../../shared/components/button/Button';
import { UserModel } from '../../shared/types';
import { useUserStore } from './userStore';

const LogOut = ({ currentUser }: { currentUser: UserModel }) => {
    const logOut = useUserStore((state) => state.logOut);

    return (
        <div className='flex center'>
            <Button border={false} type='submit' size='small' content='👟' onClick={logOut} title='Log out' />
            <p className='ml-2'>
                Logged in as <span className='b'>{currentUser.username}</span>
            </p>
        </div>
    );
};

export default LogOut;
