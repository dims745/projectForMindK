import React, { Component } from 'react';
import Item from "./Item";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import '../styles/Main.css';

class SearchPage extends Component {
    onClick() {
        this.props.onClick();
    }
    render() {
        let items = [];
        let pages = [];
        let page;
        let search;
        let tmp = document.location.href.split('?');
        if (tmp.length !== 2) {
            return (
                <div>
                    No search key
                </div>
            );
        } else {
            page = tmp[1].split('=');
            search = page[1].split('&')[0];
            if (page.length === 3) page = page[2];
            else page = 1;
            let n = page * 20;
            if (!this.props.items) return false;
            let regexp = new RegExp(`${search}`, 'i');
            items = this.props.items.filter(item => regexp.test(item.name));
            pages = [];
            pages[0] = 1;
            for (let i = 1; i < items.length / 20; i++) pages[i] = i + 1;
            items = items.slice(n - 20, n);
        }
        return (
            <div>
                <h3>Result of search</h3>
                <div className='Items'>
                    {
                        items.map(item => <Item item={item}/>)
                    }
                    <br/>
                </div>
                <div className='Pagination'>
                    {
                        pages.map(item => <Link to={'/search?key=' + search + '&page=' + item}>
                        <button onClick={()=>this.onClick()} className={'PageButton'}>{item}</button>
                    </Link>)
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        items: state.process.items,
        search: state.process.search,
        pag: state.process.pagination
    }),
    dispatch => ({
        onClick() {
            dispatch({type: "PAGINATION"});
        }
    })
)(SearchPage);