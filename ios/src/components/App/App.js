import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

/** Reducers */
import user from '../../reducers/userReducer';
import instructor from '../../reducers/instructorReducer';
import availableClasses from '../../reducers/availableClassesReducer';
import classroom from '../../reducers/classroomReducer';

/** Components */
import Login from '../Login/Login';
import StudentHome from '../StudentHome/StudentHome';

/** Routes + Nav Reducer */
const AppNavigator = StackNavigator({
  Login: { screen: Login },
  StudentHome: { screen: StudentHome },
});
const navReducer = (state, action) => AppNavigator.router.getStateForAction(action, state);

/** Combine Reducers */
const appReducer = combineReducers({
  user,
  instructor,
  availableClasses,
  classroom,
  nav: navReducer,
});


class AppNavigation extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
};

const AppWithNavigationState = connect(state => ({nav: state.nav}))(AppNavigation)

const store = createStore(appReducer);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
