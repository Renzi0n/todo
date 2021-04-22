import React from 'react';

import TodoListItem from './todo-list-item';

const TodoList = () => {
    return (
        <ul>
            <li><TodoListItem 
                label="Create react app"
                important /></li>
            <li><TodoListItem label="Drink water" /></li>
        </ul>
    );
};

export default TodoList;