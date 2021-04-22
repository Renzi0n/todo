import React from 'react';
import ReactDOM from 'react-dom';

const el = (
    <div>
        <h1>My todo app</h1>
        <input placeholder="search" />
        <ul>
            <li>Learn react</li>
            <li>Create react app</li>
        </ul>
    </div>
);

ReactDOM.render(el, document.querySelector('#root'));