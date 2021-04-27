import React from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';

import './app.css'

const App = () => {
    const todoData = [
        {label: 'Drink coffee', id: 1},
        {label: 'Make awesome app', id: 2},
        {label: 'Have a lunch', id: 3},
    ];

    return (
        <div className="app">
            <AppHeader toDo={1} done={3} />

            <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
            </div>

            <TodoList todos={todoData} />
        </div>
    );
};

export default App;