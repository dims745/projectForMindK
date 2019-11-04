import {authCreate, addAuth, addToBucket, setBucket} from './reducers';

const initState = {
    logined: false,
    bucket: []
};

export default function process (state = initState, action) {
    switch (action.type) {
        case 'CLEAR_ITEMS': return {...state, items: []};
        case 'MAKE_ORDER': return {...state, orderSuccess: action.result};
        case 'PAGINATION': console.log(action); return {...state, pagination: !state.pagination};
        case 'SEARCH': return {...state, searchRedirect: action.searchRedirect};
        case 'GET_ITEMS': return {...state, items: action.result};
        case 'ADD_TO_BUCKET': return addToBucket(state, action);
        case 'SET_BUCKET': return setBucket(state, action);
        case 'VERIFY_USER': return authCreate(state, action.result);
        case 'LOGIN_USER': if(action.result.success)return addAuth(state, action.result, action.remember); else return state;
        case 'GET_CATEGORY': return {...state, categories : action.result};
        case 'GET_POP_ITEMS': return {...state, popularItems : action.result};
        case 'DEL_AUTH': return { ...state, user: {}, logined: false};
        default: return state;
    }
}