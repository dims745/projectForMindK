import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux';
import { toAPI } from "./redux/toAPI";

toAPI(store, {type: "VERIFY_USER"}, {url : '/verify', method : 'POST', data : {
        token : localStorage.getItem('token') ?
            localStorage.getItem('token') :
            sessionStorage.getItem('token') ?
                sessionStorage.getItem('token') :
                false
    }
});
if(sessionStorage.bucket)
    store.dispatch({
        type: "SET_BUCKET",
        bucket: JSON.parse(sessionStorage.getItem('bucket'))
    });
else store.dispatch({type: "SET_BUCKET", bucket: {}});

toAPI(store, {type: "GET_CATEGORY"}, {url : '/categories', method: 'GET'});

toAPI(store, {type: "GET_POP_ITEMS"}, {url : '/products/popular', method: 'GET'});

setTimeout(()=>{console.log(store.getState())},10000);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  ,
  document.getElementById('root')
);
