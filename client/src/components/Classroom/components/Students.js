import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import './Students.css';

const Student = ({student}) =>
  <div className="Student" id={`video-${student.id}`}></div>

const Students = ({students}) =>
  <div className="Students">
    { students.map(student => <Student student={student} key={student.id} />)}
  </div>




const mapStateToProps = state => R.path(['classroom', 'students']);

export default connect(
  mapStateToProps
)(Students)

export default Students;