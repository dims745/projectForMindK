import React, { Component } from 'react';
import '../styles/LoginPage.css';
import {Link , Redirect} from "react-router-dom";
import {connect} from "react-redux";
import md5 from 'md5';
import AuthWithSN from "./AuthWithSN";
import {loginUser} from "../redux/actions";

class LoginPage extends Component {
    onSubmit(event){
        event.preventDefault();
        let user = {
            email : this.refs.email.value,
            pass : md5(this.refs.pass.value)
        };
        this.props.login(user, this.refs.remember.checked);
    }
    render() {
        if(this.props.logined)
            return (
                <Redirect to='/'/>
            )
        return (
            <div className='LoginPage'>
                <div className='LoginForm'>
                    <div>
                        <form onSubmit={()=>this.onSubmit(event)}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <h3>
                                            Log In
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Email</label>
                                    </td>
                                    <td>
                                        <input ref={'email'}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>password </label>
                                    </td>
                                    <td>
                                        <input ref={'pass'} type='password'/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type='checkbox' ref={'remember'}/>
                                        <label>   Remember?</label>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <input type='submit' value='submit' className='submit'/>
                                    </td>
                                    <td>
                                        {}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        No have account?
                                    </td>
                                    <td>
                                        <Link to='/signin'>
                                            SignIn
                                        </Link>
                                    </td>
                                </tr>
                                <tr><td></td></tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
                <AuthWithSN/>
            </div>
        );
    }
}

export default connect(
    state => ({
        logined: state.process.logined
    }),
    dispatch => ({
        login: (user, remember) => {
            dispatch(loginUser(user, remember));
        }
    })
)(LoginPage);
