import React, { useState } from 'react';
import Button from '../../shared/components/button/Button';
import { SunIcon } from '../../shared/components/icons/Sun';
import { CategoryModel, UserModel } from '../../shared/types';
import LogOut from '../users/Logout';
import CategoryColumn from './CategoryColumn';
import { useCategoryStore } from './categoryStore';

const TodoList = ({ currentUser }: { currentUser: UserModel }) => {
    const categories: CategoryModel[] = useCategoryStore((state) => state.categories);
    const [theme, setTheme] = useState('light'); // TO DO: put me in local storage for session persistence
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
            <div className='header'>
                <LogOut currentUser={currentUser} />
                <p className='b font-xl'>Knock 'em out!</p>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        console.log('submitted');
                        if (!isCreatingNewCategory) {
                            setIsCreatingNewCategory(true);
                            return;
                        } else if (inputRef.current?.value) {
                            console.log('about to create category', inputRef.current.value);
                            createCategory(inputRef.current.value);
                            inputRef.current.value = '';
                        }
                        setIsCreatingNewCategory(false);
                    }}
                >
                    <div className='flex'>
                        {isCreatingNewCategory && <input type='text' ref={inputRef} />}
                        <Button size='large' type='submit' content={isCreatingNewCategory ? 'Done' : '+ Category'} />
                        {isCreatingNewCategory && (
                            <Button
                                size='large'
                                type='cancel'
                                content='Cancel'
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
                    // content='🌙'
                    onClick={switchTheme}
                    title='Switch modes'
                />
            </div>

            <div className='categories'>
                {categories.length && categories.map((category) => <CategoryColumn {...category} />)}
            </div>
        </>
    );
};

export default TodoList;
