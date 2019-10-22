import {connect} from "react-redux";
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../styles/Header.css';

class UserBox extends Component {
    onLogout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.props.clearUser()
    }

    render() {
        let name;
        if (this.props.user)
            name = this.props.user.name;
        else name = false;
        return (
            <div className='userContainer'>
                <div>
                    <Link to='/bucket'>
                        {this.props.bucket.length ?
                            this.props.bucket.reduce((sum, current) => sum + current)
                            : 0
                        }->
                        <img className={'ico'} src={'http://' + this.props.api.host + ':' + this.props.api.port + '/images/bucket.ico'}/>
                    </Link>
                </div>
                <div>
                    {
                        name ? (
                            <div>
                                {name} <button onClick={this.onLogout.bind(this)}>Logout</button>
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
        );
    }
}

export default connect(
    state => ({
        user: state.process.user,
        api: state.process.API,
        bucket: state.process.bucket,
        bucketState: state.process.bucketState
    }),
    dispatch => ({
        clearUser : () => {
            dispatch({type: 'DEL_AUTH'});
        }
    })
)(UserBox);