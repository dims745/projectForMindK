import React, { Component } from 'react';
import './styles/Main.css';
import { Route , Switch} from "react-router-dom";
import StartPage from "./Pages/StartPage";
import CategoryView from "./Pages/CategoryView";
import Bucket from "./Pages/Bucket";
import LoginPage from "./Pages/LoginPage";
import SigninPage from "./Pages/SigninPage";

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/login'>
                        <LoginPage />
                    </Route>
                    <Route path='/signin'>
                        <SigninPage />
                    </Route>
                    <Route path='/bucket'>
                        <Bucket />
                    </Route>
                    <Route path='/category'>
                        <CategoryView />
                    </Route>
                    <Route path='/'>
                        <StartPage />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Main;
