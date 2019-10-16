import React, { Component } from 'react';
import '../styles/LoginPage.css';
import {Link , Redirect} from "react-router-dom";
import { toAPI } from "../redux/toAPI";
import store from "../redux";
import {connect} from "react-redux";
import md5 from 'md5';

class LoginPage extends Component {

    render() {
        return (
            <div class='LoginPage'>
                <LoginForm />
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            email: '',
            pass: '',
            invalidData: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    onSubmit(event){
        event.preventDefault();
        let user = {
            email : this.state.email,
            pass : this.state.pass
        };
        user.pass = md5(user.pass);
        toAPI(store,
            {type: 'LOGIN_USER', remember: this.state.remember},
            {url: '/login', method: 'POST', data: user}
            );
        console.log(store.getState());
    }
    render() {
        if(store.getState().process.logined)
            return (
                <Redirect to='/'/>
            )
        return (
            <div class='LoginForm'>
                <div>
                    <form onSubmit={this.onSubmit}>
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
                                    <input name='email' value={this.state.email} onChange={this.handleInputChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>password </label>
                                </td>
                                <td>
                                    <input name='pass' type='password' value={this.state.pass} onChange={this.handleInputChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='checkbox' name='remember' onChange={this.handleInputChange}/>
                                    <label>   Remember?</label>
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <input type='submit' value='submit' class='submit'/>
                                </td>
                                <td>
                                    {this.state.invalidData}
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
        );
    }
}

export default connect(
    state => ({
        logined: state.process
    }),
    dispatch => ({})
)(LoginPage);
