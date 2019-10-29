const host = process.env.REACT_APP_API_HOST;
const headers = {
    'Content-Type': 'application/json'
};

export function makeOrder(bucket, address, token) {
    return dispatch => {
        fetch(host + 'order',{
            method: "POST",
            headers,
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
        fetch(host + 'products?items=' + Object.keys(items).join(), {
            method: "GET",
            headers
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_ITEMS", result}));
        dispatch({type: "NOTHING"});
    }
}

export function getFromCategory(category, page) {
    return dispatch => {
        fetch(host + 'products?category=' + category + '&page=' + page, {
            method: "GET",
            headers
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_ITEMS", result}));
    }
}

export function getFromSearch(key, page) {
    return dispatch => {
        fetch(host + 'products?searchKey=' + key + '&page=' + page, {
            method: "GET",
            headers
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
        fetch(host + 'verify', {
            method: "POST",
            headers,
            body: JSON.stringify({token})
        })
            .then(res => res.json())
            .then(result => dispatch({type: "VERIFY_USER", result}));
    }
}

export function getCategory() {
    return dispatch => {
        fetch( host + 'categories', {
            method: "GET",
            headers
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_CATEGORY", result}));
    }
}

export function getPopular() {
    return dispatch => {
        fetch(host + 'products/popular', {
            method: "GET",
            headers
        })
            .then(res => res.json())
            .then(result => dispatch({type: "GET_POP_ITEMS", result}));
    }
}

export function loginUser(user, remember) {
    return dispatch => {
        fetch(host + 'login', {
            method: "POST",
            headers,
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => dispatch({type: "LOGIN_USER", result, remember}));
    }
}

export function signInUser(user, remember) {
    return dispatch => {
        fetch(host + 'signIn', {
            method: "POST",
            headers,
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => dispatch({type: "LOGIN_USER", result, remember}));
    }
}

export function AuthBySN(response, isGoogle) {
    return dispatch => {
        fetch(host + 'loginBySN', {
            method: "POST",
            headers,
            body: JSON.stringify({response, isGoogle})
        })
            .then(res => res.json())
            .then(result => dispatch({type: "LOGIN_USER", result, remember: true}));
    }
}
