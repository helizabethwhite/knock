import React from 'react';
import Button from '../../shared/components/button/Button';
import { CategoryModel } from '../../shared/types';
import CreateItemCard from '../items/CreateItemCard';
import ItemCard from '../items/ItemCard';
import { useItemStore } from '../items/itemStore';
import { useUserStore } from '../users/userStore';
import { useCategoryStore } from './categoryStore';

const CategoryColumn = (category: CategoryModel) => {
    const { id, name } = category;
    const [creatingItem, toggleCreatingItem] = React.useState(false);
    const items = useItemStore((state) => state.items);
    const itemsInCategory = React.useMemo(() => items.filter((item) => item.categoryId === id), [items, id]);
    const users = useUserStore((state) => state.users);
    const deleteCategory = useCategoryStore((state) => state.deleteCategory);
    return (
        <div className='category-column'>
            <div className='category-title-container'>
                <Button
                    title='Toggle new item'
                    onClick={() => toggleCreatingItem(!creatingItem)}
                    content={creatingItem ? '-' : '+'}
                />
                <span className='category-title'>{name}</span>
                <Button
                    type='submit'
                    size='small'
                    title='Delete category'
                    content='🗑️'
                    border={false}
                    onClick={() => deleteCategory(id)}
                />
            </div>
            <div></div>
            {creatingItem && (
                <CreateItemCard currentCategoryId={id} toggleCreatingItem={() => toggleCreatingItem(false)} />
            )}
            {itemsInCategory.length === 0 && (
                <p className='empty mt-2 ml-1'>Look's like there's nothing to do here. Woo! ✨</p>
            )}
            {itemsInCategory.map((item) => item.categoryId === id && <ItemCard item={item} users={users} />)}
        </div>
    );
};

export default CategoryColumn;
