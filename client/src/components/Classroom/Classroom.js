/* global OT */
import React, { Component } from 'react';
import Spinner from 'react-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../../services/api';
import { cameraProperties, signal } from '../../services/opentok';
import {
  setClassroom,
  isConnected,
  setSession,
  setLocalPublisher,
  instructorJoined,
  instructorLeft,
  studentJoined,
  studentLeft,
  resetClassroom } from '../../actions/classroomActions';
import R from 'ramda';
import Podium from './components/Podium';
import Students from './components/Students';
import './Classroom.css';

const connectingMask = () =>
  <div className="Classroom-mask">
    <Spinner />
    <div className="message">Connecting to Classroom</div>
  </div>

const errorMask = () =>
  <div className="Classroom-mask error">
    <Spinner />
    <div className="message">Something has gone horribly wrong. Please refresh the page.</div>
  </div>

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.connectToSession = this.connectToSession.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.publish = this.publish.bind(this);
  }

  onError(error) {
    this.setState({ error })
  }

  publish() {
    const { dispatch, user, classroom } = this.props;
    const session = R.prop('session', classroom);
    const name = { name: user.name };
    // Students won't publish audio until called upon
    const publishAudio = user.role === 'instructor';
    const publisher = OT.initPublisher(`video-${user.id}`, R.merge(cameraProperties, {name, publishAudio}));
    session.publish(publisher, error => {
      error ? this.onError(error) : dispatch(setLocalPublisher(publisher));
    });
  }

  subscribe(user) {
    const { session } = this.props.classroom;
    const name = { name: user.name };
    session.subscribe(user.stream, `video-${user.id}`, R.merge(cameraProperties, name));
  }

  onConnect() {
    const { dispatch } = this.props;
    dispatch(isConnected(true));
    const session = R.path(['classroom', 'session'], this.props);
    session.on('streamCreated', e => this.onStreamCreated(e.stream));
    session.on('streamDestroyed', e => this.onStreamDestroyed(e.stream));
    this.publish();
  }

  connectToSession(credentials) {
    const { dispatch } = this.props;
    const { apiKey, sessionId, token } = credentials;
    const session = OT.initSession(apiKey, sessionId);
    dispatch(setSession(session));
    session.connect(token, this.onConnect);
  }

  onStreamCreated(stream) {

    const { user, dispatch } = this.props;
    const joined = R.merge(JSON.parse(R.path(['connection', 'data'], stream)), { stream });
    const role = joined.role;
    const action = role === 'instructor' ? instructorJoined : studentJoined;
    dispatch(action(joined));

    /**
     * If the current user is a student, we need to send the status to new connections
     */
    if (user.role === 'student') {
      const { students } = this.props.classroom;
      const { question, answer } = students[user.id].status;
      const { connection } = stream;
      if (question || answer) {
        signal('studentStatus', { studentId: user.id, status: { question, answer } }, connection)
      }
    }
    this.subscribe(joined);
  }

  onStreamDestroyed(stream) {
    const { dispatch } = this.props;
    const { id, role } = JSON.parse(stream.connection.data);
    const action = role === 'instructor' ? instructorLeft : studentLeft;
    dispatch(action(id));
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    api.get(`classroom/${this.props.params.id}?userId=${user.id}&role=${user.role}`)
      .then(response => {
        const { classroom, credentials } = response;
        console.log(response);
        dispatch(setClassroom(classroom));
        const dispatchMethod = user.role === 'instructor' ? instructorJoined : studentJoined;
        dispatch(dispatchMethod(user));
        this.connectToSession(credentials);
      });
  }

  componentWillUnmount() {
    const { dispatch, classroom } = this.props;
    classroom.session.disconnect();
    dispatch(resetClassroom());
  }

  render() {
    const { connected, error } = this.props.classroom;
    return (
      <div className="Classroom">
        { !connected && connectingMask() }
        <div>
          <Podium />
          <Students/>
        </div>
        { error && errorMask() }
      </div>
    )
  }
}

const mapStateToProps = state => R.pick(['user', 'classroom']);

export default withRouter(connect(
  mapStateToProps
)(Classroom));
