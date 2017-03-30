import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import classroomApp from './reducers/root';
import { loadState, saveState } from './localStorage';

const configureStore = (): Store<State> => {
  const persistedState = loadState();
  const store = createStore(classroomApp, persistedState, applyMiddleware(thunk));

  store.subscribe(throttle(() => {
    saveState({
      user: store.getState().user,
    });
  }, 1000));

  return store;
};

export default configureStore;
