import React , { Component } from 'react';
import {Link} from "react-router-dom";
import '../styles/Header.css';
import { connect } from 'react-redux';
import '../styles/Main.css';

class Item extends Component {
    onClick () {
        this.props.addToBucket(this.props.item.id);
    }
    render() {
        return (
            <div className={'Item'}>
                <Link to={'/item/' + this.props.item.id}>
                    <img src={'http://' + this.props.api.host + ':' + this.props.api.port + '/images/' + this.props.item.id + '.jpg'}/>
                    <br/>
                    {this.props.item.name}
                </Link>
                <br/>
                {this.props.item.manufacturer}
                <br/>
                {this.props.item.price + ' $'}
                <br/>
                <img
                    onClick={this.onClick.bind(this)}
                    className={'ico'}
                    src={'http://' + this.props.api.host + ':' + this.props.api.port + '/images/bucket.ico'}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        api: state.process.API
    }),
    dispatch => ({
        addToBucket(id) {
            dispatch({type: "ADD_TO_BUCKET", id, count: 1});
        }
    })
)(Item);