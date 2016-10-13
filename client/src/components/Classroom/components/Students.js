import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import './Students.css';

const getStudentList = (classroom) => {
  if (!classroom) {
    return []; }
  const students = R.propOr({}, 'students')(classroom);
  const addToList = (acc, key) => acc.concat(students[key]);
  return R.reduce(addToList, [], Object.keys(students));
};

const Student = ({ student, hasQuestion, hasAnswer }) =>
  <div className="Student" id={student.id} >
    <div className="Student-indicators" >
      <div className="indicator question" onClick={hasQuestion}></div>
      <div className="indicator answer" onClick={hasAnswer}></div>
    </div>
    <div className="Student-video" id={`video-${student.id}`}></div>
  </div>

class Students extends Component {

  constructor(props) {
    super(props)
    this.hasQuestion = this.hasQuestion.bind(this);
    this.hasAnswer = this.hasAnswer.bind(this);
  }

  hasQuestion(id) {
    const {dispatch} = this.props;
    // dispatch(studentHasAnswer(id))
  }

  hasAnswer(id) {
    const {dispatch} = this.props;
    // dispatch(studentHasAnswer(id))
  }

  render(){
    const { user, classroom } = this.props;
    const studentList = getStudentList(classroom);
    return (
      <div className="Students">
        { studentList.map(student =>
          <Student student={student} hasQuestion={this.hasQuestion} hasAnswer={this.hasAnswer} key={student.id} />
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
