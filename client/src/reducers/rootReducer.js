import { combineReducers } from 'redux';

/** Reducers */
import currentUser from './currentUserReducer'
import instructor from './instructorReducer'
import classrooms from './classroomsReducer'

/** Combine Reducers */
const classroomApp = combineReducers({currentUser, instructor, classrooms});


export default classroomApp;