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

  constructor(props){
    super(props);
    this.joinClassroom = this.joinClassroom.bind(this);
  }

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

  joinClassroom(id) {
    const { navigation } = this.props;
    navigation.navigate('Classroom', {id});
  }

  render() {
    const { availableClasses } = this.props;
    const classrooms = Object.values(availableClasses);
    return (
      <View style={styles.studentHome}>
          { classrooms.length ? <StudentClassList classrooms={classrooms} join={this.joinClassroom} /> : <NoClassesAvailable /> }
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
    color: 'orange',
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 22,
    marginBottom: 35
  }
});

const mapStateToProps = (state) => R.pick(['user', 'availableClasses'], state);

export default connect(
  mapStateToProps
)(StudentHome);
