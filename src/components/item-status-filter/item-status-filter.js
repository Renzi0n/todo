import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {
    state = {
        active: 0
    };

    MAP = {
        'All': 0,
        'Active': 1,
        'Done': 2
    };

    onBtnsClick = (e) => {
        const target = e.target.textContent;
        
        this.setState({
            active: this.MAP[target]
        });

        this.props.onSetFilter(this.MAP[target]);
    };

    render() {
        const classNamesActive = 'btn btn-info';
        const classNamesSecondary = 'btn btn-outline-secondary';

        return (
            <form className="btn-group"
                    onClick={this.onBtnsClick}>
                <button type="button" className={this.state.active === 0 ? classNamesActive : classNamesSecondary}>All</button>
                <button type="button" className={this.state.active === 1 ? classNamesActive : classNamesSecondary}>Active</button>
                <button type="button" className={this.state.active === 2 ? classNamesActive : classNamesSecondary}>Done</button>
            </form>
        );
    }
}