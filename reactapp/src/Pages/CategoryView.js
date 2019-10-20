import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from "./components";
import '../styles/Main.css';
import {Link} from "react-router-dom";

class CategoryView extends Component {
    render() {
        let page = 1;
        let tmp = document.location.href.split('?');
        if(tmp.length===2){page = tmp[1].split('=')[1];}
        let n = page * 20;
        let category = tmp[0].split('/');
        category = category[category.length-1];
        if(!(this.props.category && this.props.items))return false;
        category = this.props.category.find(item => item.name === category);
        let items = this.props.items.filter(item => item.categoryId === category.id);
        let pages = [];pages[0] = 1;
        for (let i=1;i<items.length/20;i++)pages[i]=i+1;
        items = items.slice(n-20, n);
        return (
            <div>
                <h3>Products of category {category.name}</h3>
                <p>{category.description}</p>
                <div className='Items'>
                    {
                        items.map(item => <Item item={item}/>)
                    }
                    <br/>
                </div>
                <div className='Pagination'>
                    {pages.map(item => <Link to={'/category/' + category.name + '?page=' + item}>
                        <button className={'PageButton'}>{item}</button>
                    </Link>)}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        items: state.process.items,
        category: state.process.categories,
        api: state.process.API
    }),
    dispatch => ({})
)(CategoryView);
