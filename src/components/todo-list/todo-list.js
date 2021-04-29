import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onDone, onImportant, onFormChange }) => {
    const elements = todos.map((item) => {

    const {id} = item;

        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...item} 
                    onDeleted={() => onDeleted(id)} 
                    onDone={() => onDone(id)}
                    onImportant={() => onImportant(id)} 
                    onFormChange={(e) => onFormChange(id, e)} />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;