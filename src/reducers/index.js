import { combineReducers } from 'redux';

const users = [
        { user: 'admin', password: '1234', admin: true },
        { user: 'user', password: '1234', admin: false }
    ]

const listOfUsers = (list = users, action) => {
    switch (action.type) {
        case 'CREATE_ACCOUNT':
            return [...list, action.payload];
        case 'ACT_USER':
            list = list.filter(account => account.user !== action.payload.user);
            return [...list, action.payload]
        case 'DELETE_ACCOUNT':
            return list.filter(account => account.user !== action.payload.user);
        default:
            return list;
    }
}

const logged = (user = null, action, userList = users) => {
    switch (action.type) {
        case 'LOG_IN':
            user = action.payload;
            return user
        case 'LOG_OUT':
            user = action.payload
            return user
        default:
            return user
    }
}

const getImages = (state = [], action) => {
    switch(action.type){
        case 'GET_IMAGES':
            return action.payload;
        default:
            return state
    }
}

export default combineReducers({
    users: listOfUsers,
    loggedUser: logged,
    posts: getImages
})