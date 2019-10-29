import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { connect } from 'react-redux';
import {AuthBySN} from "../redux/actions";

class AuthWithSN extends Component {
    render() {
        const responseGoogle = (response) => {
            this.props.AuthSN(response, true);
        }
        const responseFacebook = (response) => {
            this.props.AuthSN(response, false);
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

export default connect(
    state => ({}),
    dispatch => ({
        AuthSN: (response, isGoogle) => {
            dispatch(AuthBySN(response, isGoogle));
        }
    })
)(AuthWithSN);