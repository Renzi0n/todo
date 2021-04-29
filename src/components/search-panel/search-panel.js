import React, { Component} from 'react';
import './search-panel.css'

export default class SearchPanel extends Component {

    state = {
        term: ''
    }

    onChangeInput = (e) => {
        const term = e ? e.target.value : '';

        this.setState({ term });

        this.props.onSearch(term);
    };

    onReset = () => {
        this.setState({
            term: ''
        });

        this.onChangeInput();
    };
    
    render () {

        return (
            <div className="search-panel">
                <input className="form-control search-input" 
                    placeholder="search" 
                    onChange={this.onChangeInput}
                    value={this.state.term} />
                <button className="close"
                        onClick={this.onReset}>
                    <i className="fa fa-close"></i>
                </button>
            </div>
        );
    }
};