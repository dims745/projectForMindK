import { authCreate, addAuth } from './auth';
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
    logined: false
}

export default function process (state = initState, action) {
    switch (action.type) {
        case "VERIFY_USER": return authCreate(state, action.result);
        case "LOGIN_USER": if(action.result.success)return addAuth(state, action.result); else return state;
        case "ADD_USER": if(action.result.success)return addAuth(state, action.result); else return state;
        case "GET_CATEGORY": return {...state, categories : action.result}
        case "DEL_AUTH": return { ...state, user: {}, logined: false};
        default: return state;
    }
    // if(action.type === "ADD_AUTH"){return authCreate(state, action);}
    //
    // if(action.type === 'test')return test(state);
    // return state;
}