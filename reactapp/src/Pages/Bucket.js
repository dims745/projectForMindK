import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../styles/Main.css';
import Item from "./Item";
import {Link} from "react-router-dom";

class Bucket extends Component {
    onClick (t) {
        console.log(this.props);
        this.props.addToBucket(t, +this.refs[t].value);
    }
    render() {
        console.log(this.props.bucket);
        if(!this.props.items || !this.props.bucket)
            return (
                <div>
                    <h2>
                        Bucket is loading or empty
                    </h2>
                </div>
            );
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
        api: state.process.API,
        bucketState: state.process.bucketState
    }),
    dispatch => ({
        addToBucket(id, count) {
            dispatch({type: "ADD_TO_BUCKET", id, count: -count});
        }
    })
)(Bucket);
