import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import AddItemPanel from '../add-item-panel/add-item-panel';

import './app.css'

export default class App extends Component {
    state = {
        todoData : [
            {label: 'Drink coffee', id: 1},
            {label: 'Make awesome app', id: 2},
            {label: 'Have a lunch', id: 3},
        ]
    };

    deleteItem = (id) => {

        this.setState(({todoData}) => {

            const ind = todoData.findIndex((el) => el.id === id);

            return { 
                todoData: [
                    ...todoData.slice(0, ind), 
                    ...todoData.slice(ind+1)
                ]
            };
        });
    };

    addItem = (label) => {

        this.setState(({todoData}) => {

            return {
                todoData: [
                    ...todoData, 
                    {
                        label, 
                        id: ++todoData.length
                    }
                ]
            };
        });
    };

    render () {
        const {todoData} = this.state;

        return (
            <div className="app">
                <AppHeader toDo={1} done={3} />

                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <AddItemPanel onAddItem={this.addItem}/>

                <TodoList 
                    todos={todoData} 
                    onDeleted={this.deleteItem}/>
            </div>
        );
    };
};