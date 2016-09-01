import React, { Component } from 'react';
import classNames from 'classnames';
import R from 'ramda';
import './CreateClassroom.css';

class CreateClassroom extends Component {

  constructor(props) {
    super(props);
    this.state = { errors: { name: false, description: false } };
    this.clear = this.clear.bind(this);
    this.createClassroom = this.createClassroom.bind(this);
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
      if (R.or(this.state.errors.name, this.state.errors.description)) { return; }
      onCreate(classroom);
      this.clear();
    }

    this.setState({
      errors: {
        name: R.isEmpty(classroom.name),
        description: R.isEmpty(classroom.description)
      }
    }, validateAndCreate);
  }

  render() {
    const { errors } = this.state;
    const nameClass = classNames('name', { error: errors.name });
    const descriptionClass = classNames('description', { error: errors.description });
    return (
      <div className="CreateClassroom">
      <div>
        <label className="label">Classroom Name</label>
        <input className={nameClass} ref="name" placeholder="Give your classroom a name" type="text"/></div>
        <label className="label">Classroom Description</label>
        <textarea className={descriptionClass} ref="description" placeholder="Give your classroom a description"/>
        <div className="errorsContainer">
          <div>{errors.name ?  'A classroom name is required' : ''}</div>
          <div>{errors.description ?  'A classroom description is required' : ''}</div>
        </div>
        <button className="btn blue" onClick={this.createClassroom}>Create Classroom</button>
    </div>)
  }
}

export default CreateClassroom;


