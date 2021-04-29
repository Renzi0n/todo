import React, { Component } from 'react';

import './add-item-panel.css';

export default class AddItemPanel extends Component {


    onAddItem = () => {
        const input = document.querySelector('.name-input').value;

        if (input !== '') {
            this.props.onAddItem(input);
        }
    };
    
    render () {

        return (
            <form className="add-item-panel">
                <input className="form-control name-input" placeholder="Item name" />

                <button 
                    className="btn btn-primary" type="reset"
                    onClick={this.onAddItem}>
                    Add item
                </button>
            </form>
        ); 
    };

};