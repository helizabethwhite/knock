import React from 'react';
import Button from '../../shared/components/button/Button';
import { CategoryModel } from '../../shared/types';
import CreateItemCard from '../items/CreateItemCard';
import ItemCard from '../items/ItemCard';
import { useItemStore } from '../items/itemStore';
import { useUserStore } from '../users/userStore';

const CategoryColumn = (category: CategoryModel) => {
    const { id, name } = category;
    const [creatingItem, toggleCreatingItem] = React.useState(false);
    const items = useItemStore((state) => state.items);
    const itemsInCategory = React.useMemo(() => items.filter((item) => item.categoryId === id), [items, id]);
    const users = useUserStore((state) => state.users);
    return (
        <div className='category-column'>
            <div className='category-title-container'>
                <Button
                    title='Toggle new item'
                    onClick={() => toggleCreatingItem(!creatingItem)}
                    content={creatingItem ? '-' : '+'}
                />
                <span className='category-title'>{name}</span>
            </div>
            <div></div>
            {creatingItem && (
                <CreateItemCard currentCategoryId={id} toggleCreatingItem={() => toggleCreatingItem(false)} />
            )}
            {itemsInCategory.map((item) => item.categoryId === id && <ItemCard item={item} users={users} />)}
        </div>
    );
};

export default CategoryColumn;
