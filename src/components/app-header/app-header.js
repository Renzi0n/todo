import React from 'react';
import './app-header.css';

const AppHeader = ({ toDo, done}) => {
    return (
        <header className="app-header d-flex">
            <h1>Todo list</h1>
            <h2>{toDo} more todo, {done} done</h2>
        </header>
    );
};

export default AppHeader;