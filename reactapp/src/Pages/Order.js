import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toAPI} from "../redux/toAPI";
import store from "../redux";

class Order extends Component {
    onClick () {
        toAPI(
            store,
            {type: "MAKE_ORDER"},
            {
                url: '/order',
                method: 'POST',
                data: {
                    bucket: Object.assign({},this.props.bucket),
                    address: this.refs.address.value,
                    token: this.props.user.token
                }
            }
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
    })
)(Order);