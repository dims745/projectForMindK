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

export function getItems(items) {
    return dispatch => {
        if(Object.keys(items).join())
        fetch('http://localhost/api/products?items=' + Object.keys(items).join(), {
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

export function getFromCategory(category, page) {
    return dispatch => {
        fetch('http://localhost/api/products?category=' + category + '&page=' + page, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_ITEMS", result}));
    }
}

export function getFromSearch(key, page) {
    return dispatch => {
        fetch('http://localhost/api/products?searchKey=' + key + '&page=' + page, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_ITEMS", result}));
    }
}

export function verifyUser() {
    return dispatch => {
        let token = localStorage.getItem('token') ?
            localStorage.getItem('token') :
            sessionStorage.getItem('token') ?
                sessionStorage.getItem('token') :
                false;
        fetch('http://localhost/api/verify', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })
            .then(res => res.json())
            .then(result => dispatch({type: "VERIFY_USER", result}));
    }
}

export function getCategory() {
    return dispatch => {
        fetch('http://localhost/api/categories', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_CATEGORY", result}));
    }
}

export function getPopular() {
    return dispatch => {
        fetch('http://localhost/api/products/popular', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_POP_ITEMS", result}));
    }
}