import React, { Component } from 'react';
import '../styles/Main.css';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import Item from "./components";

class StartPage extends Component {

    render() {
        console.log(document.location.href);
        let i = 0;
        return (
            <div className={'general2'}>
                <div className={'categories'}>
                    <h3>
                        Categories
                    </h3>
                    <ul>
                        {this.props.categories ?
                            this.props.categories.map(
                                category => <li><Link to={'/category/' + category.name}>{category.name}</Link></li>
                            )
                            : false
                        }
                    </ul>
                </div>
                <div>
                    <h3>
                        Top 10 most popular items
                    </h3>
                    {this.props.popularItems ?
                        <div className={'Items'}>
                            {
                                this.props.popularItems.map(item => <Item item={item}/>)
                            }
                        </div>

                        : false

                    }

                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        categories: state.process.categories,
        popularItems: state.process.popularItems,
    }),
    dispatch => ({})
)(StartPage);
