/* global OT */
import React, { Component } from 'react';
import Spinner from 'react-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../../services/api';
import { cameraProperties } from '../../services/opentok';
import { setClassroom, isConnected, setSession, instructorJoined, studentJoined, resetClassroom } from '../../actions/classroomActions';
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
    const { user, classroom } = this.props;
    const session = R.prop('session', classroom);
    const handleError = error => error && this.onError(error);
    const name = { name: user.name };
    const publisher = OT.initPublisher(`video-${user.id}`, R.merge(cameraProperties, name));
    session.publish(publisher, handleError);
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
    const { dispatch } = this.props;
    const { students, instructor } = this.props;
    const joined = R.merge(JSON.parse(R.path(['connection', 'data'], stream)), { stream });
    const role = joined.role;
    const userUpdate = role === 'instructor' ? { instructor: R.merge(instructor, joined) } : { students: R.assoc(joined.id, joined, students) };
    if (role === 'instructor') {
      dispatch(instructorJoined(joined));
    } else {
      dispatch(studentJoined(joined));
    }
    this.setState(userUpdate, () => this.subscribe(joined))
  }

  onStreamDestroyed(stream) {
    console.log('stream destroyed', stream);
    // Need to update state here
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    api.get(`classroom/${this.props.params.id}?id=${user.id}`)
      .then(response => {
        const { classroom, credentials } = response;
        dispatch(setClassroom(classroom));
        const dispatchMethod = user.role === 'instructor' ? instructorJoined : studentJoined;
        dispatch(dispatchMethod(user));
        this.connectToSession(credentials);
      });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetClassroom());
  }

  render() {
    const { user, connected, instructor, error } = this.props.classroom;
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
