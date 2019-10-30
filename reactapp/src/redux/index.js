import {applyMiddleware, combineReducers, createStore} from 'redux';
import process from './process';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers(
        {process}
        ),
    applyMiddleware(thunk)
);

export default store;