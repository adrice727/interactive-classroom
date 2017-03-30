import { combineReducers } from 'redux';

/** Reducers */
import auth from './auth';
import user from './user';
import instructor from './instructor';
import availableClasses from './availableClasses';
import classroom from './classroom';

/** Combine Reducers */
const classroomApp = combineReducers({ auth, user, instructor, availableClasses, classroom });

export default classroomApp;
