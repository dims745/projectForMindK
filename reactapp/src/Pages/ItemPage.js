import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getItems } from '../redux/actions';

class ItemPage extends Component{

    onClick () {
        this.props.addToBucket(this.refs.count.name, +this.refs.count.value);
    }

    componentDidMount() {
        let item = document.location.href.split('/');
        item = item[item.length-1];
        let items = [];
        items[item] = 1;
        this.props.getItem(items);
    }

    render() {

        let item = document.location.href.split('/');
        item = item[item.length-1];

        if(!this.props.item || !this.props.categories || !this.props.item.length) {
            return (
                <div>
                    Loading... Please wait
                </div>
            );
        }

        item = this.props.item.find(it => it.id === +item);

        if(!item) {
            return (
                <div>
                    Loading... Please wait
                </div>
            );
        }

        return (
            <div>
                <img alt={''} src={process.env.REACT_APP_IMAGE_HOST + item.id + '.jpg'}/>
                <br/>
                <h3>{item.name}</h3>
                <p>
                    Categories: {
                    this.props.categories.find(it => it.id === item.categoryId) ?
                    <Link to={
                        '/category?category=' + this.props.categories.find(it => it.id === item.categoryId).id
                    }>
                        {this.props.categories.find(it => it.id === item.categoryId).name}
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
                    alt={'bucket'}
                    onClick={this.onClick.bind(this)}
                    className={'ico'}
                    src={process.env.REACT_APP_IMAGE_HOST + 'bucket.ico'}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        item: state.process.items,
        categories: state.process.categories
    }),
    dispatch => ({
        addToBucket(id, count) {
            dispatch({type: 'ADD_TO_BUCKET', id, count: count});
        },
        getItem: (item)=> {
            dispatch(getItems(item));
        }
    })
)(ItemPage);