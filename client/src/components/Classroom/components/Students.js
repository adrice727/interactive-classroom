import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import classNames from 'classnames';
import { updateStudentStatus, takeQuestion, takeAnswer } from '../../../actions/classroomActions.js'
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
  const { question, answer } = student.status;
  const clickable = isUser || isInstructor;
  const indicatorsClass = classNames('Student-indicators', { show: isUser });
  const questionClass = classNames('indicator question', { active: question, clickable });
  const answerClass = classNames('indicator answer', { active: answer, clickable });
  return (
    <div className='Student'>
      <div className={indicatorsClass} >
        <div className={questionClass} onClick={handleQuestion.bind(this, student.id, !question)}></div>
        <div className={answerClass} onClick={handleAnswer.bind(this, student.id, !answer)}></div>
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

  componentWillReceiveProps({ classroom }) {
    const { dispatch } = this.props;
    const { session, publisher } = classroom;

    /**
     * We need a session and local publisher object before we can
     * set our event listeners.
     */
    if (this.state.signalListenersSet || !session || !publisher) {
      return;
    }

    const isMe = ({ connectionId }) => session.connection.connectionId === connectionId;

    session.on('signal', ({ type, data, from }) => {
      if (isMe(from)) { return; }
      const signalType = R.last(R.split(':', type));

      if (signalType === 'studentStatus') {
        const { studentId, status } = JSON.parse(data);
        dispatch(updateStudentStatus(studentId, status));
      } else if (signalType === 'takeQuestion') {
        publisher.publishAudio(true);
      } else if (signalType === 'takeAnswer') {

        publisher.publishAudio(true);
      }
    });

    this.setState({ signalListenersSet: true });
  }

  handleQuestion(studentId, question) {
    const { dispatch, user, classroom } = this.props;
    const { publisher } = classroom;
    const isInstructor = R.path(['instructor', 'id'], classroom) === user.id;
    if (user.id === studentId) {
      dispatch(updateStudentStatus(studentId, { question }, true));
      if (!question) { publisher.publishAudio(false); }
    } else if (isInstructor) {
      dispatch(takeQuestion(studentId));
    }
  }

  handleAnswer(studentId, answer) {
    const { dispatch, user, classroom } = this.props;
    const { publisher } = classroom;
    const isInstructor = R.path(['instructor', 'id'], classroom) === user.id;

    if (user.id === studentId) {
      dispatch(updateStudentStatus(studentId, { answer }, true));
      if (!answer) { publisher.publishAudio(false); }
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
