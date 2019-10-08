import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';

class App extends Component {

  render() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
  }
}

export default App;
