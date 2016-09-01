import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import R from 'ramda';
import api from '../../services/api';
import { setInstructorClassrooms } from '../../actions/instructorActions';
import CreateClassroom from './components/CreateClassroom';
import ClassroomList from './components/ClassroomList';
import './InstructorHome.css';


class InstructorHome extends Component {

  componentDidMount() {
    const { dispatch, instructor } = this.props;
    if (this.props.instructor) {
      api.get(`classrooms/${instructor.id}`)
      .then(response => {
        const classrooms = R.path(['classrooms'], response);
        const getClass = id => R.prop(id, classrooms);
        const classList = R.map(getClass, R.keys(classrooms))
        dispatch(setInstructorClassrooms(classList));
      });
    } else {
      browserHistory.push('login/instructor');
    }
  }

  render() {
    const currentClassrooms = R.pathOr([], ['props', 'instructor', 'classrooms'], this);
    return (
      <div className="InstructorHome">
        <div className="InstructorHome-create">
          <h2 className="InstructorHome-create-header">Create a New Class</h2>
          <CreateClassroom />
        </div>
        <div className="InstructorHome-current">
          <h2 className="InstructorHome-header">Current Classes</h2>
          <ClassroomList classrooms={currentClassrooms} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  instructor: state.instructor,
});

export default withRouter(connect(
  mapStateToProps
)(InstructorHome));
