import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import App from './components/app.jsx';

// Создаём кастомную историю
const history = createBrowserHistory();

render(
    <HashRouter history={history}>
        <App />
    </HashRouter>,
    document.getElementById('content')
);