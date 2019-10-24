export function authCreate(state, action) {
    return {
        ...state,
        user: {
            id: action.id,
            email: action.email,
            name: action.name,
            token: action.token
        }

    };
}

export function addAuth(state, action) {
    if(action.remember)
        localStorage.setItem('token', action.token);
    else
        sessionStorage.setItem('token', action.token);
    return {
        ...state,
        user: {
            message: action.message,
            id: action.id,
            email: action.email,
            name: action.name,
            token : action.token
        },
        logined: true
    };
}

export function addToBucket(state, action) {
    let bucket = [];
    state.bucket.map((item, index) => bucket[index]=item);
    if(bucket[action.id]){
        bucket[action.id] += action.count;
        if(bucket[action.id] <= 0) bucket.splice(action.id, 1);
        sessionStorage.setItem('bucket', JSON.stringify({...bucket}));
        return {...state, bucket};
    }
    else {
        bucket[action.id] = action.count;
        sessionStorage.setItem('bucket', JSON.stringify({...bucket}));
        return {...state, bucket};
    }
}

export function setBucket (state, action) {
    let bucket = [];
    for (let key in action.bucket) {
        bucket[key] = action.bucket[key];
    }
    return {...state, bucket};
}