import R from 'ramda'

const classroom = (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CLASSROOM':
      return R.merge(state, action.classroom);
    case 'SET_CLASSROOM_SESSION':
      return R.assoc('session', action.session, state);
    case 'RESET_CLASSROOM':
      return null;
    default:
      return state;
  }
}

export default classroom;
