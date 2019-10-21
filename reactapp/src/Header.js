import React, { Component } from 'react';
import './styles/Header.css';
import { Link, Redirect } from "react-router-dom";
import UserBox from "./Pages/UserBox";
import { connect } from 'react-redux';

class Header extends Component {
    onClick(event) {
        if(event) if(event.keyCode !== 13) return false;
        this.props.before(true, this.refs.search.value);
    }
    render() {
        if(this.props.search && this.props.search.is) {
            setTimeout(()=>this.props.before(false, undefined), 0);
            return (
                <Redirect to={'/search?key=' + this.props.search.string}/>
            );
        }
        return (
            <div>
                <div className='logo'>
                    <h2>Name of shop</h2>
                </div>
                <div className='menus'>
                    <div className='navigateLinks'>
                        {
                            ['Main Page', 'login', 'signIn', 'bucket', 'something']
                                .map((item) =>
                                    <div className={'buttonLink'}>
                                        <Link to={'/' + item}>
                                            <button>{item}</button>
                                        </Link>
                                    </div>
                                )
                        }
                    </div>
                    <div className='search'>
                        <input onKeyPress={()=>this.onClick(event)} ref={'search'}/>
                        <br/><br/>
                        <button onClick={()=>this.onClick()}>
                            Search
                        </button>
                    </div>
                    <UserBox/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        search: state.process.search
    }),
    dispatch => ({
        before(is, string) {
            dispatch({type: "SEARCH", search: {is, string}});
        }
    })
)(
    Header
);
