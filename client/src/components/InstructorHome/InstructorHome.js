import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import R from 'ramda';
import api from '../../services/api';
import { addClassroom, setClassrooms, removeClassroom } from '../../actions/instructorActions';
import CreateClassroom from './components/CreateClassroom';
import ClassroomList from './components/ClassroomList';
import './InstructorHome.css';

class InstructorHome extends Component {

  constructor(props){
    super(props);
    this.removeClassroom = this.removeClassroom.bind(this);
    this.createClassroom = this.createClassroom.bind(this);
  }

  componentDidMount() {
    const { dispatch, instructor } = this.props;
    console.log('instructor', instructor);
    if (instructor) {
      api.get(`classrooms/${instructor.id}`)
      .then(response => {
        console.log('POPOPO', response);
        const classrooms = R.path(['classrooms'], response);
        dispatch(setClassrooms(classrooms));
      });
    } else {
      browserHistory.push('login/instructor');
    }
  }

  createClassroom(classroomData) {
    const { dispatch, instructor } = this.props;
    const instructorData = { instructorId: instructor.id, instructorName: instructor.name }
    const classroom = R.merge(classroomData, instructorData);
      api.post('classroom', { classroom })
      .then(classroomData => {
        dispatch(addClassroom(classroomData));
      });
  }

  removeClassroom(id) {
    const { dispatch } = this.props;
    api.del(`classroom/${id}`)
    .then(response => dispatch(removeClassroom(id)))
    .catch(error => console.log(error));
  }

  render() {
    const { instructor } = this.props;
    const currentClassrooms = R.pathOr([], ['classrooms'], instructor);
    return (
      <div className="InstructorHome">
        <div className="InstructorHome-create">
          <h2 className="InstructorHome-create-header">Create a New Class</h2>
          <CreateClassroom onCreate={this.createClassroom} />
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
