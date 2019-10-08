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
            </div>
        );
    }
}

class NavigateLinks extends Component {
    render() {
        return (
            <div class='navigateLinks'>
                {
                    ['Main Page', 'LogIn', 'SignIn', 'korsina']
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

export default Header;
