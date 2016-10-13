import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import './Students.css';

const getStudentList = (classroom) => {
  if (!classroom) { return [];  }
  const students = R.propOr({},'students')(classroom);
  const addToList = (acc, key) => acc.concat(students[key]);
  return R.reduce(addToList, [], Object.keys(students));
};

const Student = ({ student }) =>
  <div className="Student" id={`video-${student.id}`}></div>

// class Students extends Component {

//   constructor(props) {
//     super(props)
//     this.hasQuestion = this.hasQuestion.bind(this);
//     this.hasAnswer = this.hasAnswer.bind(this);
//   }

//   hasAnswer(id) {
//     dispatch
//   }


// }


const Students = ({ user, classroom }) => {
  const studentList = getStudentList(classroom);
  console.log('TIMTIMTIM', studentList)

  return (
    <div className="Students">
      { studentList.map(student => <Student student={student} key={student.id} />)}
    </div>
  )
};

const mapStateToProps = state => R.pick(['user', 'classroom']);

export default connect(
  mapStateToProps
)(Students);

