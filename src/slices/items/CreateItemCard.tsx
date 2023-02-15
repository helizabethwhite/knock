import React from 'react';
import Button from '../../shared/components/button/Button';
import { ItemModel } from '../../shared/types';
import { useUserStore } from '../users/userStore';
import { useItemStore } from './itemStore';

const CreateItemCard = ({
    currentCategoryId,
    toggleCreatingItem,
}: {
    currentCategoryId: string;
    toggleCreatingItem: () => void;
}) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const activeUserId = useUserStore((state) => state.activeUserId);
    const createItem = useItemStore((state) => state.createItem);

    return (
        <div className='item-card creating'>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    createItem({
                        title,
                        description,
                        categoryId: currentCategoryId,
                        creatorUserId: activeUserId,
                        completed: false,
                    } as ItemModel);
                    toggleCreatingItem();
                }}
            >
                <input
                    className='title'
                    placeholder='Enter item title'
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <input
                    placeholder='Enter description'
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    value={description}
                />
                <Button type='submit' content='Create' />
            </form>
        </div>
    );
};

export default CreateItemCard;
