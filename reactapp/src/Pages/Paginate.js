import React, { Component } from "react";
import '../styles/Main.css';
import Item from "./Item";
import {parseUrl} from "query-string";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getFromCategory, getFromSearch} from "../redux/actions";

class Paginate extends Component {
    onclick(page) {
        let query = parseUrl(document.location.toString()).query;
        if(query.category)
            this.props.getItemsCategory(query.category, page);
        if(query.searchKey !== undefined)
            this.props.getItemsSearch(query.searchKey, page);
    }

    render() {
        let pages = [];
        let url = parseUrl(document.location.toString());
        if(!url.query.page) url.query.page = '1';
        for(let i=1;i<=this.props.items.last_page;i++) {
            pages[i] = url.url.split('/')[url.url.split('/').length-1];
            let tmp = '';
            for(let key in url.query) {
                if (key === 'page') tmp = '&page=' + i;
                else pages[i] += '?' + key + '=' + url.query[key];
                    }
            pages[i] += tmp;
        }
        return (
            <div>
                <div className={'Items'}>
                    {
                        this.props.items.data.map(item => <Item item={item}/>)
                    }
                </div>
                <div className={'Pagination'}>
                    {
                        pages.map((item, index)=>
                            <Link to={item}>
                                <button onClick={()=>this.onclick(index)}>
                                    {index}
                                </button>
                            </Link>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({

    }),
    dispatch => ({
        getItemsCategory: (category, page) => {
            dispatch(getFromCategory(category, page));
        },
        getItemsSearch: (key, page) => {
            dispatch(getFromSearch(key, page));
        }
    })
)(Paginate);