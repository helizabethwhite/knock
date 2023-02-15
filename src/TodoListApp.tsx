import React, { useState } from 'react';
import Button from './shared/components/button/Button';
import { SunIcon } from './shared/components/icons/Sun';
import { CategoryModel, UserModel } from './shared/types';
import CategoryColumn from './slices/categories/CategoryColumn';
import { useCategoryStore } from './slices/categories/categoryStore';
import LogOut from './slices/users/Logout';

const TodoListApp = ({ currentUser }: { currentUser: UserModel }) => {
    const categories: CategoryModel[] = useCategoryStore((state) => state.categories);
    const [theme, setTheme] = useState('light');
    const createCategory = useCategoryStore((state) => state.createCategory);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [isCreatingNewCategory, setIsCreatingNewCategory] = React.useState(false);
    const switchTheme = () => {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            setTheme('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            setTheme('light');
        }
    };

    return (
        <>
            <div className='header mb-1'>
                <LogOut currentUser={currentUser} />
                <p className='b font-xl'>Knock 'em out!</p>
                <div className='flex'>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            console.log('submitted');
                            if (!isCreatingNewCategory) {
                                setIsCreatingNewCategory(true);
                                return;
                            } else if (inputRef.current?.value) {
                                createCategory(inputRef.current.value);
                                inputRef.current.value = '';
                            }
                            setIsCreatingNewCategory(false);
                        }}
                    >
                        <div className='flex'>
                            {isCreatingNewCategory && (
                                <input type='text' placeholder='Enter category name' ref={inputRef} />
                            )}
                            <Button
                                size='large'
                                classList='ml-1'
                                type='submit'
                                content={isCreatingNewCategory ? 'Done' : '+ Category'}
                            />
                            {isCreatingNewCategory && (
                                <Button
                                    size='large'
                                    type='cancel'
                                    content='Cancel'
                                    classList='ml-1'
                                    onClick={() => setIsCreatingNewCategory(false)}
                                />
                            )}
                        </div>
                    </form>
                    <Button
                        classList='ml-2 mode-switcher'
                        border={false}
                        type='submit'
                        size='small'
                        content={theme === 'light' ? '🌙' : <SunIcon />}
                        onClick={switchTheme}
                        title='Switch modes'
                    />
                </div>
            </div>

            <div className='categories'>
                {categories.length && categories.map((category) => <CategoryColumn {...category} />)}
            </div>
        </>
    );
};

export default TodoListApp;
