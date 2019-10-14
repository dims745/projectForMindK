import React, { Component } from 'react';
import '../styles/Main.css';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

class StartPage extends Component {

    render() {
        return (
            <div class='general2'>
                <div>
                    <ul>
                        {this.props.categories.map(item => <li><Link to={item}/></li>)}
                    </ul>
                </div>
                <div>
                    items
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        categories: state.process.categories
    }),
    dispatch => ({})
)(StartPage);
