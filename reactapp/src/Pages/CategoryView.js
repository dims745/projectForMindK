import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Main.css';
import Paginate from './Paginate';
import { parseUrl } from 'query-string';
import { getFromCategory } from '../redux/actions';

class CategoryView extends Component {

    componentDidMount() {
        let query = parseUrl(document.location.toString()).query;
        this.props.getItems(query.category, query.page ? query.page : 1);
    }

    render() {

        let query = parseUrl(document.location.toString()).query;

        if(!this.props.category || !this.props.items || this.props.items.length) {
            this.props.getItems(query.category, query.page ? query.page : 1);
            return (
                <div>
                    Loading...
                </div>
            );
        }

        let category = this.props.category.find(it => query.category === it.id.toString());

        return (
            <div>
                <h3>Products of category {category.name}</h3>
                <p>{category.description}</p>
                <Paginate items={this.props.items}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        items: state.process.items,
        category: state.process.categories
    }),
    dispatch => ({
        getItems: (category, page) => {
            dispatch(getFromCategory(category, page));
        }
    })
)(CategoryView);
