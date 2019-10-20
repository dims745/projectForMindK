import {authCreate, addAuth, addToBucket} from './reducers';
function test(state) {
    return {
        ...state,
        rever : {
            name: 1
        }
    }

}
const initState = {
    API : {
        host : 'localhost',
        port : 80
    },
    logined: false,
    bucket: {}
}

export default function process (state = initState, action) {
    switch (action.type) {
        case "GET_ITEMS": return {...state, items: action.result};
        case "ADD_TO_BUCKET": return addToBucket(state, action);
        case "SET_BUCKET":
            let bucket = [];
            for (let key in action.bucket) {
                bucket[key] = action.bucket[key];
            }
            return {...state, bucket};
        case "VERIFY_USER": return authCreate(state, action.result);
        case "LOGIN_USER": if(action.result.success)return addAuth(state, action.result); else return state;
        case "ADD_USER": if(action.result.success)return addAuth(state, action.result); else return state;
        case "GET_CATEGORY": return {...state, categories : action.result};
        case "GET_POP_ITEMS": return {...state, popularItems : action.result};
        case "DEL_AUTH": return { ...state, user: {}, logined: false};
        default: return state;
    }
}