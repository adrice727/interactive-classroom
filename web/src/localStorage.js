import R from 'ramda';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (R.isNil(serializedState)) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    // Nothing to do, nowhere to go
  }
}