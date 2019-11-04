import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { Link , Redirect } from 'react-router-dom';
import store from '../redux';
import { connect } from 'react-redux';
import md5 from 'md5';
import AuthWithSN from './AuthWithSN';
import { signInUser } from '../redux/actions';

class SigninPage extends Component {

    onSubmit(event){
        event.preventDefault();
        let user = {
            name: this.refs.name.value,
            email : this.refs.email.value,
            password : md5(this.refs.pass.value)
        };
        this.props.signIn(user, this.refs.remember.checked);
    }

    render() {

        if(store.getState().process.logined)
            return (
                <Redirect to='/'/>
            );

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
                                            Sign In
                                        </h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Name
                                    </td>
                                    <td>
                                        <input ref={'name'}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Email</label>
                                    </td>
                                    <td>
                                        <input ref={'email'} type={'email'}/>
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
                                        <label>   Remember to LogIn?</label>
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
        signIn: (user, remember) => {
            dispatch(signInUser(user, remember));
        }
    })
)(SigninPage);
