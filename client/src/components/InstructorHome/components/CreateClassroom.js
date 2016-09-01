import React, { Component } from 'react';
import classNames from 'classnames';
import R from 'ramda';
import './CreateClassroom.css';

class CreateClassroom extends Component {

  constructor(props) {
    super(props);
    this.state = { nameError: false, descriptionError: false }
    this.createClassroom = this.createClassroom.bind(this);
    this.clear = this.clear.bind(this);
  }

  clear () {
    this.refs.name.value = '';
    this.refs.description.value = '';
  }

  createClassroom() {

    const { onCreate } = this.props;

    const classroom = {
      name: this.refs.name.value,
      description: this.refs.description.value,
    }

    const validateAndCreate = () => {
      if (R.or(this.state.nameError, this.state.descriptionError)) {
        return;
      }
      onCreate(classroom);
      this.clear();
    }

    this.setState({
      nameError: R.isEmpty(classroom.name),
      descriptionError: R.isEmpty(classroom.description)
    }, validateAndCreate);
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

export default CreateClassroom;


