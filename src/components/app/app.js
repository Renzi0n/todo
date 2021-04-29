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
            this.createTodoItem('Drink coffee', 0),
            this.createTodoItem('Make awesome app', 1),
            this.createTodoItem('Have a lunch', 2),
        ]
    };

    createTodoItem (label, length) {
        return { 
            label, 
            important: false,
            done: false,
            id: ++length
        };
    };

    findIndexInArr (arr, id) {
        return arr.findIndex((el) => el.id === id);
    };

    deleteItem = (id) => {

        this.setState(({todoData}) => {

            const ind = this.findIndexInArr(todoData, id);

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
                    this.createTodoItem(label, todoData.length)
                ]
            };
        });
    };

    setDone = (id) => {
        
        this.setState(({todoData}) => {

            const ind = this.findIndexInArr(todoData, id);
            const newObj = {
                ...todoData[ind],
                done: !todoData[ind].done
            };

            return {
                todoData: [
                    ...todoData.slice(0, ind), 
                    newObj,
                    ...todoData.slice(ind+1),
                ]
            };
        });
    };

    setImportant = (id) => {
        
        this.setState(({todoData}) => {

            const ind = this.findIndexInArr(todoData, id);
            const newObj = {
                ...todoData[ind],
                important: !todoData[ind].important
            };

            return {
                todoData: [
                    ...todoData.slice(0, ind), 
                    newObj,
                    ...todoData.slice(ind+1)
                ]
            }
        });
    };

    render () {
        const {todoData} = this.state;

        const countDone = todoData.filter((it) => it.done).length;
        const countTodo = todoData.length - countDone;

        return (
            <div className="app">
                <AppHeader toDo={countTodo} done={countDone} />

                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <AddItemPanel onAddItem={this.addItem}/>

                <TodoList 
                    todos={todoData} 
                    onDeleted={this.deleteItem}
                    onDone={this.setDone}
                    onImportant={this.setImportant}/>
            </div>
        );
    };
};