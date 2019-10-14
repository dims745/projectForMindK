export function authCreate(state, action) {
    return {
        ...state,
        user: {
            id: action.id,
            email: action.email,
            name: action.name
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