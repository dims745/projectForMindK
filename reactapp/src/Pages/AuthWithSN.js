import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { connect } from 'react-redux';
import { AuthBySN } from '../redux/actions';

class AuthWithSN extends Component {
    render() {

        const responseGoogle = (response) => {
            this.props.AuthSN(response, true);
        };

        const responseFacebook = (response) => {
            this.props.AuthSN(response, false);
        };

        return (
            <div className={'SNContainer'}>
                <br/>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_ID}
                    buttonText='Login with Google'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <br/>
                <br/>
                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_ID}
                    autoLoad={false}
                    fields='name,email'
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