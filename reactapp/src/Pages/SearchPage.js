import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Main.css';
import { parseUrl } from 'query-string';
import Paginate from './Paginate';
import { getFromSearch } from '../redux/actions';

class SearchPage extends Component {

    render() {

        let query = parseUrl(document.location.toString()).query;
        if(!this.props.items || this.props.items.length) {
            this.props.getItems(query.searchKey, query.page ? query.page : 1);
            return (
                <div>
                    Loading...
                </div>
            );
        }

        return (
            <div>
                <h3>Result of search</h3>
                <Paginate items={this.props.items}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        items: state.process.items,
        search: state.process.search
    }),
    dispatch => ({
        getItems: (key, page) => {
            dispatch(getFromSearch(key, page));
        }
    })
)(SearchPage);