export default (state = [], action) =>{
    switch(action.type){
        case 'ADD_SAVING':
            return action.payload;
        case 'EDIT_SAVING':
            state = state.filter(account => account.user !== action.payload.user);
            return action.payload;
        case 'FETCH_SAVNGS':
            return action.payload;
        default:
            return state;
    }
}