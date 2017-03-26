import { combineReducers } from 'redux';

/** Reducers */
import user from './user'
import instructor from './instructor'
import availableClasses from './availableClasses'
import classroom from './classroom'

/** Combine Reducers */
const classroomApp = combineReducers({user, instructor, availableClasses, classroom});

export default classroomApp;