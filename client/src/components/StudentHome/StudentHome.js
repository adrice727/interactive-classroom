import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import R from 'ramda';
import api from '../../services/api';
import { setAvailableClassrooms } from '../../actions/availableClassroomsActions';
import StudentClassList from './components/StudentClassList';
import './StudentHome.css';

class StudentHome extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { student, dispatch } = this.props;
    if (student) {
      api.get('classrooms')
      .then(response => {
        const classrooms = R.path(['classrooms'], response);
        dispatch(setAvailableClassrooms(classrooms));
      }).catch(console.log)
    } else {
      browserHistory.push('/login');
    }
  }

  render() {
    const { classrooms } = this.props;
    return (
      <div className="StudentHome">
        <div className="StudentHome-current">
          <h2 className="StudentHome-header">Available Classes</h2>
          <StudentClassList classrooms={classrooms} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  student: state.currentUser,
  classrooms: state.availableClassrooms
});

export default connect(
  mapStateToProps
)(StudentHome);
