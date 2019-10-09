import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/Header.css';
import { Link } from "react-router-dom";
import API from './api.js';

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
                <User />
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
                <Link to={this.props.name}>
                <button>{this.props.name}</button>
                </Link>
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

class User extends Component {
    render() {
        return (
            <div class='userContainer'>
                <Bucket />
                <UserInfo />
                <Logout />
            </div>
        );
    }
}

class Bucket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false
        };
    }
    componentDidMount() {
        let count = localStorage.getItem('count') ? localStorage.getItem('count') : false;
        this.setState({
                value: count
        });
    }

    render() {
        return (
            <div>
                {this.state.value ? this.state.value + '  ' : false}
                <Link to='/bucket'>
                    <img src='/src/res/bucket.ico'/>
                </Link>
            </div>
        );
    }
}

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: false
        };
    }
    componentDidMount() {
        let user = {
            'token' : localStorage.getItem('token')
        }
        if(!user.token)return false;
        fetch('http://' + API.host + ':' + API.port + '/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
                .then(
                    (result) => {
                    this.setState({
                        name: result.name
                    });
                });
    }
    render() {
        return (
            <div>
                {this.state.name ? this.state.name : <Link to='login'><button>Login</button></Link>}
            </div>
        );
    }
}

class Logout extends Component {
    render() {
        return (
            <div>
                <button>
                    Logout
                </button>
            </div>
        );
    }
}

export default Header;
