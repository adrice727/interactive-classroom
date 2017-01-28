/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './src/components/Header/Header';
import Login from './src/components/Login/Login';
import StudentHome from './src/components/StudentHome/StudentHome';


const App = StackNavigator({
  Login: { screen: Login },
  StudentHome: { screen: StudentHome },
});

AppRegistry.registerComponent('interactiveClassroom', () => App);
