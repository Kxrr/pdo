/**
 * Created by kxrr on 17/2/1.
 */

import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { pdoApp } from './reducers';

const loggerMiddleware = createLogger();

export let store = createStore(
    pdoApp,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

