const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    origin: null,
    name: null
}


export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SIGN_IN':
            return {...state, isSignedIn: true, userId: action.payload.userId, origin: action.payload.origin, name: action.payload.name};
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, userId: null, origin: null, name: null};
        default:
            return state;
    }
}