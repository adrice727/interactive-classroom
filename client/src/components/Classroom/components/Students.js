import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import classNames from 'classnames';
import { updateStudentStatus, takeQuestion, takeAnswer } from '../../../actions/classroom.js'
import { otCore } from '../../../services/opentok';
import './Students.css';

const getStudentList = (classroom) => {
  if (!classroom) {
    return [];
  }
  const students = R.propOr({}, 'students')(classroom);
  const addToList = (acc, key) => acc.concat(students[key]);
  return R.reduce(addToList, [], Object.keys(students));
};


const Student = ({ student, handleQuestion, handleAnswer, isUser, isInstructor }) => {
  const { hasQuestion, hasAnswer } = student.status;
  const clickable = isUser || isInstructor;
  const studentClass = classNames('Student', student.status);
  const indicatorsClass = classNames('Student-indicators', { show: isUser });
  const questionClass = classNames('indicator question', { active: hasQuestion, clickable });
  const answerClass = classNames('indicator answer', { active: hasAnswer, clickable });
  return (
    <div className={studentClass}>
      <div className={indicatorsClass} >
        <div className={questionClass} onClick={handleQuestion.bind(this, student.id, !hasQuestion)}></div>
        <div className={answerClass} onClick={handleAnswer.bind(this, student.id, !hasAnswer)}></div>
      </div>
      <div className="Student-video" id={`video-${student.id}`}></div>
      <div className="Student-name">{student.name}</div>
    </div>
  )
}

class Students extends Component {

  constructor(props) {
    super(props);
    this.state = { signalListenersSet: false };
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidMount() {
    const { dispatch }  = this.props;

    const isMe = ({ connectionId }) => otCore.getSession().connection.connectionId === connectionId;

    otCore.on('signal', ({ type, data, from }) => {
      if (isMe(from)) { return; }
      const signalType = R.last(R.split(':', type));
      const { studentId, status } = JSON.parse(data);

      if (signalType === 'studentStatus') {
        dispatch(updateStudentStatus(studentId, status));
      } else if (signalType === 'takeQuestion') {
        dispatch(updateStudentStatus(studentId, { asking: true }, true));
        otCore.toggleLocalAudio(true);
      } else if (signalType === 'takeAnswer') {
        dispatch(updateStudentStatus(studentId, { answering: true }, true));
        otCore.toggleLocalAudio(true);
      }
    });
  }

  handleQuestion(studentId, hasQuestion) {
    const { dispatch, user, classroom } = this.props;
    const isInstructor = R.path(['instructor', 'id'], classroom) === user.id;
    if (user.id === studentId) {
      const status = hasQuestion ? { hasQuestion } : { hasQuestion, asking: false };
      dispatch(updateStudentStatus(studentId, status, true));
      !hasQuestion && otCore.toggleLocalAudio(false); // eslint-disable-line no-unused-expressions
    } else if (isInstructor) {
      dispatch(takeQuestion(studentId));
    }
  }

  handleAnswer(studentId, hasAnswer) {
    const { dispatch, user, classroom } = this.props;
    const isInstructor = R.path(['instructor', 'id'], classroom) === user.id;

    if (user.id === studentId) {
      const status = hasAnswer ? { hasAnswer } : { hasAnswer, answering: false };
      dispatch(updateStudentStatus(studentId, status, true));
      !hasAnswer && otCore.toggleLocalAudio(false); // eslint-disable-line no-unused-expressions
    } else if (isInstructor) {
      dispatch(takeAnswer(studentId));
    }
  }

  render() {
    const { user, classroom } = this.props;
    const isInstructor = R.path(['instructor', 'id'], classroom) === user.id;
    const studentList = getStudentList(classroom);
    return (
      <div className="Students">
        { studentList.map(student =>
          <Student
            student={student}
            handleQuestion={this.handleQuestion}
            handleAnswer={this.handleAnswer}
            isUser={user.id === student.id}
            isInstructor={isInstructor}
            key={student.id} />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => R.pick(['user', 'classroom']);

export default connect(
  mapStateToProps
)(Students);
