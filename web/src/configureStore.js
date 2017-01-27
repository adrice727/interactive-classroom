import { createStore } from 'redux';
import throttle from 'lodash.throttle';
import classroomApp from './reducers/rootReducer'
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(classroomApp, persistedState)

  store.subscribe(throttle(() => {
    saveState({
      user: store.getState().user,
      instructor: store.getState().instructor
    })
  }, 1000));

  return store;
};

export default configureStore;
