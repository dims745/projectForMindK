import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/Header.css';

class Header extends Component {

    render() {
        return (
            <div>
                <Logo />
                <Menus />
            </div>
        );
    }
}

class Logo extends Component {
    render() {
        return (
            <div class='logo'>
                <h2>Name of shop</h2>
            </div>
        );
    }
}

class Menus extends Component {
    render() {
        return (
            <div class='menus'>
                <NavigateLinks />
                <Search />
                <UserInfo />
            </div>
        );
    }
}

class NavigateLinks extends Component {
    render() {
        return (
            <div class='navigateLinks'>
                {
                    ['Main Page', 'LogIn', 'SignIn', 'korsina', 'something']
                        .map((item)=> <ButtonLink name={item} />)
                }
            </div>
        );
    }
}

class ButtonLink extends Component {
    render() {
        return (
            <div class='buttonLink'>
                <button>{this.props.name}</button>
            </div>
        );
    }
}

class Search extends Component {
    render() {
        return (
            <div class='search'>
                <input/>
                <br/>
                <input type='checkbox' />
                <label>Something that...</label>
            </div>
        );
    }
}

class UserInfo extends Component {
    render() {
        return (
            <div class='userContainer'>
                <h3>text</h3>
            </div>
        );
    }
}

export default Header;
