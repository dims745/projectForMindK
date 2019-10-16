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

                    </ul>
                </div>
                <div>

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
