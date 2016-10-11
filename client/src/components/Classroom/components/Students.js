import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import './Students.css';

const toList = obj => {
  const addToList = (acc, key) => acc.concat(obj[key]);
  return R.reduce(addToList, [], Object.keys(obj));
};

const Student = ({ student }) =>
  <div className="Student" id={`video-${student.id}`}></div>

const Students = ({ user, students }) => {
  const studentList = toList(students);
  return (
    <div className="Students">
      { studentList.map(student => <Student student={student} key={student.id} />)}
    </div>
  )
};

export default Students;
