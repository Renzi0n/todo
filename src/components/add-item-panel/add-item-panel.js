import React, { Component } from 'react';

import './add-item-panel.css';

export default class AddItemPanel extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onAddItem = (e) => {
        e.preventDefault();
        this.props.onAddItem(this.state.label);
        this.setState({
            label:''
        });
    };
    
    render () {
        const isDisabled = this.state.label === '' ? true : false;

        return (
            <form className="add-item-panel"
                  onSubmit={this.onAddItem} >
                <input 
                    type="text" className="form-control name-input" 
                    placeholder="What needs to be done?" 
                    onChange={this.onLabelChange} 
                    value={this.state.label} />

                <button 
                    className="btn btn-primary"
                    disabled={isDisabled}>
                    Add item
                </button>
            </form>
        ); 
    };

};