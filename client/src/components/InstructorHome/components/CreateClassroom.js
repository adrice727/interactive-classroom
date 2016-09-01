import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import R from 'ramda';
import api from '../../../services/api';
import { addInstructorClassroom } from '../../../actions/instructorActions';
import './CreateClassroom.css';

class CreateClassroom extends Component {

  constructor(props) {
    super(props);
    this.state = { nameError: false, descriptionError: false }
    this.createClassroom = this.createClassroom.bind(this);
  }

  createClassroom() {

    const { dispatch, instructor } = this.props;

    const classroom = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      instructorId: instructor.id
    }

    const create = () => {
      if (R.or(this.state.nameError, this.state.descriptionError)) {
        return;
      }

      api.post('classroom', { classroom })
      .then(classroomData => {
        dispatch(addInstructorClassroom(classroomData));
        this.refs.name.value = '';
        this.refs.description.value = '';
      });
    }

    this.setState({
      nameError: R.isEmpty(classroom.name),
      descriptionError: R.isEmpty(classroom.description)
    }, create)
  }

  render() {
    const nameClass = classNames('name', { error: this.state.nameError });
    const descriptionClass = classNames('description', { error: this.state.descriptionError });

    return (
      <div className="CreateClassroom">
      <div>
        <label className="label">Classroom Name</label>
        <input className={nameClass} ref="name" placeholder="Give your classroom a name" type="text"/></div>
        <label className="label">Classroom Description</label>
        <textarea className={descriptionClass} ref="description" placeholder="Give your classroom a description"/>
        <div className="errorsContainer">
          <div>{this.state.nameError ?  'A classroom name is required' : ''}</div>
          <div>{this.state.descriptionError ?  'A classroom description is required' : ''}</div>
        </div>
        <button className="btn blue" onClick={this.createClassroom}>Create Classroom</button>
    </div>)
  }
}

const mapStateToProps = (state, { params }) => ({
  instructor: state.instructor,
});

export default connect(
  mapStateToProps
)(CreateClassroom);

