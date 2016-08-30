import { combineReducers } from 'redux';

/** Reducers */
import user from './userReducer';

/** Combine Reducers */
const classroomApp = combineReducers({user});


export default classroomApp;