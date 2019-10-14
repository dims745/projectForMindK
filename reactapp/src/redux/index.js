import {combineReducers, createStore} from 'redux';

import process from './process';

const store = createStore(combineReducers({
    process
}));

export default store;