import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux';
//import thunk from "redux-thunk";
import { toAPI } from "./redux/actions";

toAPI(store, {type: "ADD_AUTH"}, {url : '/verify', data : {
    token : localStorage.getItem('token') ?
        localStorage.getItem('token') :
        sessionStorage.getItem('token') ?
            sessionStorage.getItem('token') :
            false
    }
});
toAPI(store, {type: "ADD_CATEGORY"}, {url : '/categories', data : {}})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  ,
  document.getElementById('root')
);
