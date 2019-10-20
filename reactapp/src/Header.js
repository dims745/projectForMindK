import React, { Component } from 'react';
import './styles/Header.css';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Header extends Component {
    onLogout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.props.clearUser()
    }
    render() {
        let name;
        if (this.props.authState.user)
            name = this.props.authState.user.name;
        else name = false;
        return (
            <div>
                <div className='logo'>
                    <h2>Name of shop</h2>
                </div>
                <div className='menus'>
                    <div className='navigateLinks'>
                        {
                            ['Main Page', 'login', 'signIn', 'bucket', 'something']
                                .map((item) => <ButtonLink key={'but' + item} name={item}/>)
                        }
                    </div>
                    <div className='search'>
                        <input/>
                        <br/>
                        <input type='checkbox'/>
                        <label>Something that...</label>
                    </div>
                    <div className='userContainer'>
                        <div>
                            <Link to='/bucket'>
                                {Object.values(this.props.bucket).length ?
                                    Object.values(this.props.bucket).reduce((sum, current) => sum + current)
                                : 0
                                }->
                                <img className={'ico'} src={'http://' + this.props.api.host + ':' + this.props.api.port + '/images/bucket.ico'}/>
                            </Link>
                        </div>
                        <div>
                            {
                                name ? (
                                    <div>
                                        {name}
                                        <button onClick={this.onLogout.bind(this)}>Logout</button>
                                    </div>
                                ) : (
                                    <div>
                                        <Link to='/login'>
                                            <button id='isLogin'>Login</button>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ButtonLink extends Component {
    render() {
        return (
            <div className={'buttonLink'}>
                <Link to={'/' + this.props.name}>
                    <button>{this.props.name}</button>
                </Link>
            </div>
        );
    }
}

export default connect(
    state => ({
        authState: state.process,
        api: state.process.API,
        bucket: state.process.bucket
    }),
    dispatch => ({
        clearUser : () => {
            dispatch({type: 'DEL_AUTH'});
        }
    })
)(Header);
