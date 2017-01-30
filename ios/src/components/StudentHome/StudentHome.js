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

// class StudentHome extends Component {

//   componentDidMount() {
//     const { user, dispatch } = this.props;
//     if (user) {
//       api.get('classrooms')
//       .then(classrooms => dispatch(setAvailableClasses(classrooms)))
//       .catch(error => console.log(error));
//     } else {
//       browserHistory.push('/login');
//     }
//   }

//   render() {
//     const { availableClasses } = this.props;
//     return (
//       <div className="StudentHome">
//         <div className="StudentHome-current">
//           <h2 className="StudentHome-header">Available Classes</h2>
//           <StudentClassList classrooms={availableClasses} />
//         </div>
//       </div>
//     )
//   }
// }

export default class StudentHome extends Component {
  render() {
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

// const mapStateToProps = (state) => R.pick(['user', 'availableClasses'], state);

// export default connect(
//   mapStateToProps
// )(StudentHome);
