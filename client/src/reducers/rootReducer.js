import { combineReducers } from 'redux';

/** Reducers */
import currentUser from './currentUserReducer'
import instructor from './instructorReducer'

/** Combine Reducers */
const classroomApp = combineReducers({currentUser, instructor});


export default classroomApp;