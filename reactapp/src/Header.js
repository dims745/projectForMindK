import React, { Component } from 'react';
import './styles/Header.css';
import { Link, Redirect } from 'react-router-dom';
import UserBox from './Pages/UserBox';
import { connect } from 'react-redux';
import { getFromSearch } from './redux/actions';

class Header extends Component {

    onClick(event) {
        if(event) if(event.keyCode !== 13)
            return false;
        this.props.getItems(this.refs.search.value, 1);
        this.props.redirect(true, this.refs.search.value);
    }

    render() {

        if(this.props.searchRedirect && this.props.searchRedirect.is) {
            this.props.redirect(false, this.refs.search.value);
            return (
                <Redirect to={'/search?searchKey=' + this.props.searchRedirect.key}/>
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
                            [
                                {name: 'Main Page', url: ''},
                                {name: 'Login', url: 'login'},
                                {name: 'Sign In', url: 'signin'},
                                {name: 'Bucket', url: 'bucket'},
                                {name: 'All products', url: 'search?searchKey=&page=1', onclick: ()=>this.onClick()}
                            ]
                                .map((item, index) =>
                                    <div key={index} className={'buttonLink'}>
                                        <Link to={'/' + item.url}>
                                            <button
                                                className={'navigateLink'}
                                                onClick={item.onclick}
                                            >{item.name}</button>
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
        searchRedirect: state.process.searchRedirect
    }),
    dispatch => ({
        getItems: (key, page) => {
            dispatch(getFromSearch(key, page));
        },
        redirect: (is, key) => {
            dispatch({type: 'SEARCH', searchRedirect: {is, key}});
        }
    })
)(
    Header
);
