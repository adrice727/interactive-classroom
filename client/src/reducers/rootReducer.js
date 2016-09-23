import { combineReducers } from 'redux';

/** Reducers */
import currentUser from './currentUserReducer'
import instructor from './instructorReducer'
import availableClassrooms from './availableClassroomsReducer'
import activeClassroom from './activeClassroomReducer'

/** Combine Reducers */
const classroomApp = combineReducers({currentUser, instructor, availableClassrooms, activeClassroom});


export default classroomApp;