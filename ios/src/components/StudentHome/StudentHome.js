import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import api from '../../services/api';
import { setAvailableClasses } from '../../actions/availableClassesActions';
import StudentClassList from './components/StudentClassList';

class StudentHome extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  componentDidMount() {
    const { user, dispatch, navigation } = this.props;
    if (user) {
      api.get('classrooms')
        .then(classrooms => dispatch(setAvailableClasses(classrooms)))
        .catch(error => console.log(error));
    } else {
      navigation.navigate('login');
    }
  }

  render() {
    const { availableClasses } = this.props;
    console.log(availableClasses);
    return (
      <View style={styles.studentHome}>
        <Text style={styles.studentHomeHeader}>You are home</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  studentHome: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  studentHomeHeader: {
    color: 'white',
    fontFamily: 'AppleSDGothicNeo-Light',
  }
});

const mapStateToProps = (state) => R.pick(['user', 'availableClasses'], state);

export default connect(
  mapStateToProps
)(StudentHome);
