import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../styles/Main.css';
import Item from "./Item";
import {Link} from "react-router-dom";
import { getItems } from "../redux/actions";

class Bucket extends Component {
    onClick (t) {
        this.props.addToBucket(t, +this.refs[t].value);
    }

    render() {
        if(!this.props.bucket || this.props.bucket.length<1)
            return (
                <div>
                    <h2>
                        Bucket is empty
                    </h2>
                </div>
            );

        if(!this.props.items  || !this.props.user || !this.props.items.length) {
            this.props.getBucketItems(this.props.bucket);
            return (
                <div>
                    <h2>
                        Bucket is loading
                    </h2>
                </div>
            );
        }

        let items = [];
        this.props.items.map(item=> items[item.id]=1);
        if(Object.keys(items).join() !== Object.keys(this.props.bucket).join()) {
            this.props.getBucketItems(this.props.bucket);
            return (
                <div>
                    <h2>
                        Bucket is loading
                    </h2>
                </div>
            );
        }

        let bucket = [];
        let totalPrice = 0;
        this.props.bucket.map((item, index) =>{
            bucket[index] = this.props.items.find(it => it.id === index);
            totalPrice += item * bucket[index].price;
        });

        return (
            <div>
                <h2>
                    Bucket:
                </h2>
                <div>
                    Total Price = {totalPrice} $
                </div>
                <br/>
                {
                    this.props.user.id ?
                        <div>
                            <Link to={'/order'}>
                                <button>make order</button>
                            </Link>
                            <br/>
                        </div>
                        : <div>
                        to make order you need login
                        <br/>
                        </div>
                }
                {
                    this.props.bucket.map((item, index) =>
                        <div key={index}>
                            <hr/>
                            <Item
                                item={this.props.items.find(it => it.id === index)}
                            />
                            <label>
                                Count {item}
                            </label>
                            <br/>
                            <input ref={index}/>
                            <label> Del from </label>
                            <img
                                onClick={()=>this.onClick(index)}
                                className={'ico'}
                                src={'http://' + this.props.api.host + ':' + this.props.api.port + '/images/bucket.ico'}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.process.user,
        items: state.process.items,
        bucket: state.process.bucket,
        api: state.process.API
    }),
    dispatch => ({
        addToBucket(id, count) {
            dispatch({type: "ADD_TO_BUCKET", id, count: -count});
        },
        getBucketItems: (bucket)=> {
            dispatch(getItems(bucket));
        }
    })
)(Bucket);
