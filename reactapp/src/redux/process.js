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
        case "ADD_AUTH": return authCreate(state, action);
        case "ADD_USER": if(action.success)return addAuth(state, action); else return state;

        case "DEL_AUTH": return { ...state, user: {}, logined: false};
        default: return state;
    }
    // if(action.type === "ADD_AUTH"){return authCreate(state, action);}
    //
    // if(action.type === 'test')return test(state);
    // return state;
}