import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

class ItemPage extends Component{
    onClick () {
        this.props.addToBucket(this.refs.count.name, +this.refs.count.value);
    }
    render() {
        if(!this.props.item) return false;
        let item = document.location.href.split('/');
        item = this.props.item[item[item.length-1]-1];
        return (
            <div>
                <img src={'http://' + this.props.api.host + ':' + this.props.api.port + '/images/' + item.id + '.jpg'}/>
                <br/>
                <h3>{item.name}</h3>
                <p>
                    Categories: {
                    this.props.categories.find(item => item.id === item.categoryId) ?
                    <Link to={
                        '/category/' + this.props.categories.find(item => item.id === item.categoryId).name
                    }>
                        {this.props.categories.find(item => item.id === item.categoryId).name}
                    </Link> : false
                    }
                </p>
                <br/>
                <p>
                    Manufacturer: {item.manufacturer}
                </p>
                <br/>
                <p>{item.description}</p>
                <br/><br/>
                <h3>Price: {item.price}</h3>
                <h3>Available count: {item.count}</h3>
                <br/>
                <input name={item.id} ref={'count'}/><label> Add to </label>
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
        item: state.process.items,
        api: state.process.API,
        categories: state.process.categories
    }),
    dispatch => ({
        addToBucket(id, count) {
            dispatch({type: "ADD_TO_BUCKET", id, count: count});
        }
    })
)(ItemPage);