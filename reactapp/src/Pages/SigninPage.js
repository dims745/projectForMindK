import React, { Component } from 'react';
import '../styles/LoginPage.css';
import API from "../api";
import {Link , useHistory} from "react-router-dom";

class SigninPage extends Component {

    render() {
        return (
            <div class='LoginPage'>
                <SigninForm />
            </div>
        );
    }
}

class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            name : '',
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
            name : this.state.name,
            email : this.state.email,
            password : this.state.password
        }
        fetch('http://' + API.host + ':' + API.port + '/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.success) {
                        if(this.state.remember) localStorage.setItem('token', result.token);
                        else sessionStorage.setItem('token', result.token);

                    }
                    else this.setState({
                        invalidData : 'incorrect input data'
                    });
                })
            .catch((err)=>{console.log(err);
                this.setState({
                invalidData : 'Error of connection to server'
            });})
    }
    render() {

        return (
            <div class='LoginForm'>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <h3>
                                        Sign In
                                    </h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Name
                                </td>
                                <td>
                                    <input name='name' value={this.state.name} onChange={this.handleInputChange}/>
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
                                    <input name='password' type='password' value={this.state.password} onChange={this.handleInputChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='checkbox' name='remember' onChange={this.handleInputChange}/>
                                    <label>   Remember to LogIn?</label>
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
                                    Already have account?
                                </td>
                                <td>
                                    <Link to='/login'>
                                        LogIn
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

export default SigninPage;
