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
        ],
        term: '',
        type: 0
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

    setProperty(arr, id, property) {
        const ind = this.findIndexInArr(arr, id);
        const newObj = {
            ...arr[ind],
            [property]: !arr[ind][property]
        };

        return [
                ...arr.slice(0, ind), 
                newObj,
                ...arr.slice(ind+1),
        ];
};

    setDone = (id) => {
        
        this.setState(({todoData}) => {

            return {
                todoData: this.setProperty(todoData, id, 'done')
            };
        });
    };

    setImportant = (id) => {
        
        this.setState(({todoData}) => {

            return {
                todoData: this.setProperty(todoData, id, 'important')
            };
        });
    };

    onChangeSearch = (term) => {
        this.setState({term});
    };

    search = (todoData, term) => {
        if (term === '') {
            return todoData;
        }

        return todoData.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    };

    onSetFilter = (type) => {
        this.setState({type});
    };

    filterArr = (arr, type) => {
        if (type === 1) {
            return arr.filter((it) => !it.done);
        } else if (type === 2) {
            return arr.filter((it) => it.done);
        };

        return arr;
    };

    onFormChange = (id, e) => {
        this.setState(({todoData}) => {
            const ind = this.findIndexInArr(todoData, id);
            const newObj = {
                ...todoData[ind],
                label: e.target.value
            };

            return {
                todoData: [
                    ...todoData.slice(0, ind), 
                    newObj,
                    ...todoData.slice(ind+1),
                ]
            }
        });
    };

    render () {
        const {todoData, term, type} = this.state;

        let visibleItems = this.search(todoData, term);
        visibleItems = this.filterArr(visibleItems, type);

        const countDone = todoData.filter((it) => it.done).length;
        const countTodo = todoData.length - countDone;

        return (
            <div className="app">
                <AppHeader toDo={countTodo} done={countDone} />

                <div className="top-panel d-flex">
                    <SearchPanel 
                        onSearch={this.onChangeSearch} 
                        value={term} />
                    <ItemStatusFilter 
                        onSetFilter={this.onSetFilter}/>
                </div>

                <TodoList 
                    todos={visibleItems} 
                    onDeleted={this.deleteItem}
                    onDone={this.setDone}
                    onImportant={this.setImportant}
                    onFormChange={this.onFormChange} />

                <AddItemPanel onAddItem={this.addItem}/>
            </div>
        );
    };
};