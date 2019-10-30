import {connect} from 'react-redux';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
                        <img alt={'bucket'} className={'ico'} src={process.env.REACT_APP_IMAGE_HOST + 'bucket.ico'}/>
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
        bucket: state.process.bucket
    }),
    dispatch => ({
        clearUser : () => {
            dispatch({type: 'DEL_AUTH'});
        }
    })
)(UserBox);