import React from 'react';
import ReactDOM from 'react-dom';

const TodoList = () => {
    return (
        <ul>
            <li>Learn react</li>
            <li>Create react app</li>
        </ul>
    );
};

const AppHeader = () => {
    return <h1>My todo app</h1>;
};

const SearchPanel = () => {
    return <input placeholder="search" />;
};

const App = () => {
    return (
        <div>
            <AppHeader />
            <SearchPanel />
            <TodoList />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));