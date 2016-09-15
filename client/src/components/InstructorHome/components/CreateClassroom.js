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
    this.refs.title.value = '';
    this.refs.description.value = '';
    this.refs.image.value = '';
  }

  createClassroom() {

    const { onCreate } = this.props;

    const classroom = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      imageURL: this.refs.image.value
    }

    const validateAndCreate = () => {
      if (R.or(this.state.errors.title, this.state.errors.description)) { return; }
      onCreate(classroom);
      this.clear();
    }

    this.setState({
      errors: {
        title: R.isEmpty(classroom.name),
        description: R.isEmpty(classroom.description)
      }
    }, validateAndCreate);
  }

  render() {
    const { errors } = this.state;
    const titleClass = classNames('title', { error: errors.name });
    const descriptionClass = classNames('description', { error: errors.description });
    return (
      <div className="CreateClassroom">
      <div>
        <label className="label">Classroom Title</label>
        <input className={titleClass} ref="title" placeholder="Give your classroom a title" type="text"/></div>
        <label className="label">Classroom Description</label>
        <textarea className={descriptionClass} ref="description" placeholder="Give your classroom a description"/>
        <label className="label">Classroom Icon</label>
        <input className="icon" ref="image" placeholder="Paste an image url" type="text"/>
        <div className="errorsContainer">
          <div>{errors.title ?  'A classroom name is required' : ''}</div>
          <div>{errors.description ?  'A classroom description is required' : ''}</div>
        </div>
        <button className="btn blue" onClick={this.createClassroom}>Create Classroom</button>
    </div>)
  }
}

export default CreateClassroom;


