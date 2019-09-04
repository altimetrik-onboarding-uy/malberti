import { combineReducers } from 'redux';

import authReducer from './authReducer';
import savingReducer from './savingReducer';

export default combineReducers({
    auth: authReducer,
    savings: savingReducer
})