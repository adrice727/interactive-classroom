import { combineReducers } from 'redux';

/** Reducers */
import user from './userReducer'
import instructor from './instructorReducer'
import availableClasses from './availableClassesReducer'
import classroom from './classroomReducer'

/** Combine Reducers */
const classroomApp = combineReducers({user, instructor, availableClasses, classroom});

export default classroomApp;