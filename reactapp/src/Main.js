import React, { Component } from 'react';
import './styles/Main.css';
import { Route , Switch} from 'react-router-dom';
import StartPage from './Pages/StartPage';
import CategoryView from './Pages/CategoryView';
import Bucket from './Pages/Bucket';
import LoginPage from './Pages/LoginPage';
import SigninPage from './Pages/SigninPage';
import ItemPage from './Pages/ItemPage';
import SearchPage from './Pages/SearchPage';
import Order from './Pages/Order';

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>

                    <Route path={'/login'} component={LoginPage}/>

                    <Route path={'/signin'} component={SigninPage}/>

                    <Route path={'/bucket'} component={Bucket}/>

                    <Route path={'/item'} component={ItemPage}/>

                    <Route path={'/category'} component={CategoryView}/>

                    <Route path={'/search'} component={SearchPage}/>

                    <Route path={'/order'} component={Order}/>

                    <Route path={'/'} component={StartPage}/>

                </Switch>
            </div>
        );
    }
}

export default Main;
