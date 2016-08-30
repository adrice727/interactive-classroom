import { createStore } from 'redux';
import classroomApp from './reducers/rootReducer'
const configureStore = () => createStore(classroomApp);
export default configureStore;