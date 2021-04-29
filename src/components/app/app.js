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

    getLeveshteinDistance (s1, s2, costs = {}) {
        var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
        l1 = s1.length;
        l2 = s2.length;
        
        var cr = costs.replace || 1;
        var cri = costs.replaceCase || costs.replace || 1;
        var ci = costs.insert || 1;
        var cd = costs.remove || 1;
    
        cutHalf = flip = Math.max(l1, l2);
    
        var minCost = Math.min(cd, ci, cr);
        var minD = Math.max(minCost, (l1 - l2) * cd);
        var minI = Math.max(minCost, (l2 - l1) * ci);
        var buf = new Array((cutHalf * 2) - 1);
    
        for (i = 0; i <= l2; ++i) {
            buf[i] = i * minD;
        }
    
        for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
            ch = s1[i];
            chl = ch.toLowerCase();
    
            buf[flip] = (i + 1) * minI;
    
            ii = flip;
            ii2 = cutHalf - flip;
    
            for (j = 0; j < l2; ++j, ++ii, ++ii2) {
                cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
                buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
            }
        }
        return buf[l2 + cutHalf - flip];
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
            return arr.filter((it) => it.done === false);
        } else if (type === 2) {
            return arr.filter((it) => it.done === true);
        };

        return arr;
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
                    onImportant={this.setImportant}/>

                <AddItemPanel onAddItem={this.addItem}/>
            </div>
        );
    };
};