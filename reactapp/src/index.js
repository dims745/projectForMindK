import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux';
import {getCategory, getPopular, verifyUser} from "./redux/actions";


store.dispatch(verifyUser());

store.dispatch(getCategory());

store.dispatch(getPopular());

if(sessionStorage.bucket)
    store.dispatch({
        type: "SET_BUCKET",
        bucket: JSON.parse(sessionStorage.getItem('bucket'))
    });
else store.dispatch({type: "SET_BUCKET", bucket: {}});

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
