import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {

    state = {
        change: false
    };

    onChangeClick = (e) => {
        this.setState(({change}) => {
            return {
                change: !change
            };
        });

        document.querySelector(`#form-${this.props.id}`).focus();
    };

    onSetDone = () => {
        if (!this.state.change) {
            this.props.onDone();
        }
    };

    render () {
        const { label, onDeleted, onImportant, done, important, onFormChange, id } = this.props;

        let classNames = 'todo-list-item';
        let changeClassNames = 'todo-list-item-label';
        let btnClassNames = 'btn btn-sm float-right'

        if (done) {
            classNames += ' done';
        }

        if (important) {
            classNames += ' important';
        }

        if (!this.state.change) {
            changeClassNames += ' todo-list-item-label--hide';
            btnClassNames += ' btn-outline-secondary'
        } else {
            btnClassNames += ' btn-secondary'
        }
    
        return (
            <span className={classNames}>
                <input type="text" 
                    id={`form-${id}`}
                    className={changeClassNames}
                    onClick={this.onSetDone}
                    value={label} 
                    onChange={onFormChange} />
    
                <button type="button"
                        className="btn btn-outline-success btn-sm float-right btn-important"
                        onClick={onImportant}>
                    <i className="fa fa-exclamation" />
                </button>
    
                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right btn-delete"
                        onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
                </button>
    
                <button type="button"
                        className={btnClassNames}
                        onClick={this.onChangeClick}>
                    <i className="fa fa-pencil" />
                </button>
            </span>
        );
    };
};