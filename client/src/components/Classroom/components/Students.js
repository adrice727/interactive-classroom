import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import classNames from 'classnames';
import { studentHasQuestion, studentHasAnswer } from '../../../actions/classroomActions.js'
import './Students.css';

const getStudentList = (classroom) => {
  if (!classroom) {
    return [];
  }
  const students = R.propOr({}, 'students')(classroom);
  const addToList = (acc, key) => acc.concat(students[key]);
  return R.reduce(addToList, [], Object.keys(students));
};

const Student = ({ student, hasQuestion, hasAnswer, isUser }) => {
  const indicatorsClass = classNames('Student-indicators', { show: isUser });
  const questionClass = classNames('indicator question', { active: student.hasQuestion });
  const answerClass = classNames('indicator answer', { active: student.hasAnswer });
  return (
    <div className='Student'>
      <div className={indicatorsClass} >
        <div className={questionClass} onClick={hasQuestion.bind(this, student)}></div>
        <div className={answerClass} onClick={hasAnswer.bind(this, student)}></div>
      </div>
      <div className="Student-video" id={`video-${student.id}`}></div>
    </div>
  )
}


class Students extends Component {

  constructor(props) {
    super(props)
    this.hasQuestion = this.hasQuestion.bind(this);
    this.hasAnswer = this.hasAnswer.bind(this);
  }

  hasQuestion(student) {
    const { dispatch } = this.props;
    dispatch(studentHasQuestion(student))
  }

  hasAnswer(student) {
    const { dispatch } = this.props;
    dispatch(studentHasAnswer(student))
  }

  render() {
    const { user, classroom } = this.props;
    const studentList = getStudentList(classroom);
    return (
      <div className="Students">
        { studentList.map(student =>
          <Student
            student={student}
            hasQuestion={this.hasQuestion}
            hasAnswer={this.hasAnswer}
            isUser={user.id === student.id}
            key={student.id} />
        )}
      </div>
    )
  }
}


// const Students = ({ user, classroom }) => {
//   const studentList = getStudentList(classroom);
//   console.log('TIMTIMTIM', studentList)

//   return (
//     <div className="Students">
//       { studentList.map(student => <Student student={student} key={student.id} />)}
//     </div>
//   )
// };

const mapStateToProps = state => R.pick(['user', 'classroom']);

export default connect(
  mapStateToProps
)(Students);
