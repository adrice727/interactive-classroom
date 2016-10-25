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
        <div className={questionClass} onClick={hasQuestion.bind(this, student.id)}></div>
        <div className={answerClass} onClick={hasAnswer.bind(this, student.id)}></div>
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
    this.isMe = this.isMe.bind(this);
  }

  componentWillReceiveProps({ classroom }) {
    const { session } = classroom;
    const { dispatch } = this.props;

    if (this.state.signalListenersSet || !session) {
      return;
    }

    const isMe = ({connectionId}) => session.connectionId === connectionId;

    session.on('signal:studentHasQuestion', ({ from, data }) => {
      if(isMe(from)) { return; }
      const { studentId } = JSON.parse(data);
      dispatch(studentHasQuestion(studentId));
    });

    session.on({
      'signal:studentHasAnswer': ({ from, data }) => {
        if(isMe(from)) { return; }
        const { studentId } = JSON.parse(data);
        dispatch(studentHasAnswer(studentId));
      }
    });

    this.setState({ signalListenersSet: true });
  }

  hasQuestion(studentId) {
    const { dispatch } = this.props;
    dispatch(studentHasQuestion(studentId, true))
  }

  hasAnswer(studentId) {
    const { dispatch } = this.props;
    dispatch(studentHasAnswer(studentId, true))
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
