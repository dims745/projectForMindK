import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { toAPI } from "../redux/toAPI";
import store from "../redux";
import React, { Component } from 'react';
import '../styles/LoginPage.css';

class AuthWithSN extends Component {
    render() {
        const responseGoogle = (response) => {
            toAPI(store,
                {type: 'LOGIN_USER', remember: true},
                {url: '/loginBySN', method: 'POST', data: {response, isGoogle: true}}
            );
        }
        const responseFacebook = (response) => {
            toAPI(store,
                {type: 'LOGIN_USER', remember: true},
                {url: '/loginBySN', method: 'POST', data: {response, isGoogle: false}}
            );
        }
        return (
            <div className={'SNContainer'}>
                <br/>
                <GoogleLogin
                    clientId="1056206117288-hu5liv6fafdeq3no99837fiau4j3c8op.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <br/>
                <br/>
                <FacebookLogin
                    appId="402901910377759"
                    autoLoad={false}
                    fields="name,email"
                    onClick={''}
                    callback={responseFacebook} />
            </div>
        );
    }
}

export default AuthWithSN;