import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, browserHistory } from 'react-router';
import R from 'ramda';
import api from '../../services/api';
import { addClassroom, setClassrooms, removeClassroom } from '../../actions/instructor';
import CreateClassroom from './components/CreateClassroom';
import InstructorClassList from './components/InstructorClassList';
import './InstructorHome.css';

class InstructorHome extends Component {

  constructor(props) {
    super(props);
    this.removeClassroom = this.removeClassroom.bind(this);
    this.createClassroom = this.createClassroom.bind(this);
  }

  componentDidMount() {
    const { dispatch, instructor } = this.props;
    if (instructor) {
      api.get(`classrooms/${instructor.id}`)
        .then(classrooms => dispatch(setClassrooms(classrooms)))
        .catch(error => console.log(error));
    } else {
      browserHistory.push('login');
    }
  }

  createClassroom(classroomData) {
    const { dispatch, instructor } = this.props;
    const instructorData = { instructorId: instructor.id, instructorName: instructor.name }
    api.post('classroom', R.merge(classroomData, instructorData))
      .then(classroom => dispatch(addClassroom(classroom)))
      .catch(error => console.log(error));
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
          <InstructorClassList classrooms={currentClassrooms} removeClassroom={this.removeClassroom} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  instructor: state.user,
});

export default withRouter(connect(
  mapStateToProps
)(InstructorHome));
