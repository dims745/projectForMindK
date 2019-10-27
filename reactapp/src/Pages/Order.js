import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeOrder } from "../redux/actions";

class Order extends Component {
    onClick () {
        this.props.makeOrder(
            Object.assign({},this.props.bucket),
            this.refs.address.value,
            this.props.user.token
        );
    }
    render() {
        return (
            <div>
                <h3>
                    Making order (from your bucket):
                </h3>
                <label>
                    Your address </label>
                <input ref={'address'}/>
                <br/><br/>
                <button onClick={()=>this.onClick()}>
                    Send
                </button>
                <br/><br/>
                {
                    this.props.order ?
                        this.props.order
                        : ''
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.process.user,
        bucket: state.process.bucket,
        order: state.process.orderSuccess
    }),
    dispatch => ({
        makeOrder: (bucket, address, token)=> {
            dispatch(makeOrder(bucket, address, token));
        }
    })
)(Order);