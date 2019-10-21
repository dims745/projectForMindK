import React, { Component } from 'react';
import { connect } from 'react-redux';
import  '../styles/Main.css';
import Item from "./components";

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
        return (
            <div>
                <h2>
                    Bucket:
                </h2>
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
        items: state.process.items,
        bucket: state.process.bucket,
        api: state.process.API
    }),
    dispatch => ({
        addToBucket(id, count) {
            dispatch({type: "ADD_TO_BUCKET", id, count: -count});
        }
    })
)(Bucket);
