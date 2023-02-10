import { useMemo, useRef, useState } from 'react';
import { ItemModel, UserModel } from '../../shared/types';
import { useItemStore } from './itemStore';

const ItemCard = ({ item, users }: { item: ItemModel; users: UserModel[] }) => {
    const {
        id,
        title: originalTitle,
        description: originalDescription,
        creatorUserId,
        createdAt,
        completed,
        categoryId,
    } = item;
    const creatorUser = useMemo(() => users.find((user) => user.id === creatorUserId), [creatorUserId, users]);
    const updateItem = useItemStore((state) => state.updateItem);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState(originalTitle);

    const [description, setDescription] = useState(originalDescription);

    return (
        <div className={`item-card${completed ? ' completed' : ''}`}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    updateItem(id, {
                        id,
                        title,
                        description,
                        creatorUserId,
                        completed,
                        createdAt,
                        categoryId,
                    } as ItemModel);
                    if (titleInputRef.current) {
                        titleInputRef.current.blur();
                    }
                    if (descriptionInputRef.current) {
                        descriptionInputRef.current.blur();
                    }
                }}
            >
                <div className='flex align-items-c'>
                    <input
                        disabled={completed}
                        className='title'
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        ref={titleInputRef}
                    />
                    <button style={{ display: 'none' }} type='submit' />
                    <button
                        title='Mark completed'
                        type='button'
                        className={`mr-1 check-box${completed ? ' completed' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            updateItem(id, {
                                id,
                                title,
                                description,
                                creatorUserId,
                                createdAt,
                                categoryId,
                                completed: !completed,
                            });
                        }}
                    />
                </div>

                <input
                    disabled={completed}
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    ref={descriptionInputRef}
                ></input>
            </form>

            <div className='attribution ml-1'>{`Created by ${creatorUser?.username || 'Unknown'} on ${new Date(
                createdAt
            ).toLocaleDateString()}`}</div>
        </div>
    );
};

export default ItemCard;
