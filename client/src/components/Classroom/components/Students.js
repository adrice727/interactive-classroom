import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import classNames from 'classnames';
import { updateStudentStatus } from '../../../actions/classroomActions.js'
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
  const questionClass = classNames('indicator question', { active: student.status.question });
  const answerClass = classNames('indicator answer', { active: student.status.answer });
  const questionHandler = hasQuestion.bind(this, student.id, !student.status.question);
  const answerHandler = hasAnswer.bind(this, student.id, !student.status.answer);
  return (
    <div className='Student'>
      <div className={indicatorsClass} >
        <div className={questionClass} onClick={questionHandler}></div>
        <div className={answerClass} onClick={answerHandler}></div>
      </div>
      <div className="Student-video" id={`video-${student.id}`}></div>
    </div>
  )
}

class Students extends Component {

  constructor(props) {
    super(props);
    this.state = { signalListenersSet: false };
    this.hasQuestion = this.hasQuestion.bind(this);
    this.hasAnswer = this.hasAnswer.bind(this);
  }

  componentWillReceiveProps({ classroom }) {
    const { session } = classroom;
    const { dispatch } = this.props;

    if (this.state.signalListenersSet || !session) {
      return;
    }

    const isMe = ({connectionId}) => session.connection.connectionId === connectionId;

    session.on('signal:studentStatus', ({ from, data }) => {
      if(isMe(from)) { return; }
      const { studentId, status } = JSON.parse(data);
      dispatch(updateStudentStatus(studentId, status));
    });

    this.setState({ signalListenersSet: true });
  }

  hasQuestion(studentId, question) {
    const { dispatch } = this.props;
    dispatch(updateStudentStatus(studentId, { question }, true))
  }

  hasAnswer(studentId, answer) {
    const { dispatch } = this.props;
    dispatch(updateStudentStatus(studentId, { answer }, true))
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

const mapStateToProps = state => R.pick(['user', 'classroom']);

export default connect(
  mapStateToProps
)(Students);
