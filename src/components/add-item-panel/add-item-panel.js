import React, { Component } from 'react';

import './add-item-panel.css';

export default class AddItemPanel extends Component {

    onAddItemBtnClick = () => {
        this.props.onAddItem(document.querySelector('.name-input').value);
    };

    render () {

        return (
            <form className="add-item-panel">
                <input className="form-control name-input" placeholder="Item name" />

                <button 
                    className="btn btn-primary" type="reset"
                    onClick={this.onAddItemBtnClick}>
                    Add item
                </button>
            </form>
        ); 
    };

};