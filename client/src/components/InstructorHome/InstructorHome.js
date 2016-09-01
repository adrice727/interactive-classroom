import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import R from 'ramda';
import api from '../../services/api';
import { setInstructorClassrooms, removeInstructorClassroom } from '../../actions/instructorActions';
import CreateClassroom from './components/CreateClassroom';
import ClassroomList from './components/ClassroomList';
import './InstructorHome.css';

class InstructorHome extends Component {

  constructor(props){
    super(props);
    this.removeClassroom = this.removeClassroom.bind(this);
  }

  componentDidMount() {
    const { dispatch, instructor } = this.props;
    console.log('instructor', instructor);
    if (instructor) {
      api.get(`classrooms/${instructor.id}`)
      .then(response => {
        console.log('POPOPO', response);
        const classrooms = R.path(['classrooms'], response);
        dispatch(setInstructorClassrooms(classrooms));
      });
    } else {
      browserHistory.push('login/instructor');
    }
  }

  removeClassroom(id) {
    const { dispatch } = this.props;
    api.del(`classroom/${id}`)
    .then(response => dispatch(removeInstructorClassroom(id)))
    .catch(error => console.log(error));
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
          <ClassroomList classrooms={currentClassrooms} removeClassroom={this.removeClassroom} />
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
