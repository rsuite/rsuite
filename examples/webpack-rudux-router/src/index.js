import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import reducers from './reducers';
import routes from './routes';

import './less/index.less';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {

    const createLogger = require('redux-logger');
    const logger = createLogger();
    middlewares.push(logger);
}

const store = createStore(
    combineReducers({
        store: reducers,
        routing: routerReducer
    }), applyMiddleware(...middlewares)
);

const history = syncHistoryWithStore(hashHistory, store);

render((
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
), document.getElementById('mount'));
