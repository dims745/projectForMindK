export function makeOrder(bucket, address, token) {
    return dispatch => {
        fetch('http://localhost/api/order',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bucket,
                address,
                token
            })
        })
            .then(res => res.json())
            .then(result => dispatch({type: "MAKE_ORDER", result}));
    }
};

export function getBucketItems(bucket) {
    return dispatch => {
        if(Object.keys(bucket).join())
        fetch('http://localhost/api/products?items=' + Object.keys(bucket).join(), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_ITEMS", result}));
        dispatch({type: "NOTHING"});
    }
}