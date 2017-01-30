import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import api from '../../services/api';
import { setAvailableClasses } from '../../actions/availableClassesActions';
import StudentClassList from './components/StudentClassList';

const NoClassesAvailable = () =>
  <View style={styles.noClasses}>
    <Text style={styles.noClassesText}>No classes available</Text>
  </View>

class StudentHome extends Component {

  static navigationOptions = {
    title: 'Available Classes',
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
    // const classes = Object.values(availableClasses);
    const classes = [];
    return (
      <View style={styles.studentHome}>
          { classes.length ? <StudentClassList classes={classes} /> : <NoClassesAvailable /> }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  studentHome: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  noClasses: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noClassesText: {
    textAlignVertical: 'center',
    color: 'darkgrey',
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 22,
    marginBottom: 35
  }
});

const mapStateToProps = (state) => R.pick(['user', 'availableClasses'], state);

export default connect(
  mapStateToProps
)(StudentHome);
