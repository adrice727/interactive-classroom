/* global OT */
import React, { Component } from 'react';
import Spinner from 'react-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../../services/api';
import { cameraProperties } from '../../services/opentok';
import { setClassroom, resetClassroom  } from '../../actions/classroomActions';
// import { addCredentials } from '../../actions/userActions';
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

const classroomInfo = classroom =>
  <div className="Classroom-info">
    <div>
      <span>{ `${classroom.title} with ${classroom.instructorName}` }</span>
    </div>
  </div>

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroom: null,
      instruct: null,
      students: [],
      connected: false,
      error: null
    }
    this.connectToSession = this.connectToSession.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.publish = this.publish.bind(this);
  }

  onError(error) {
    this.setState({ error })
  }


  publish() {
    const { session } = this.state;
    const { user } = this.props;
    const handleError = error => error && this.onError(error);
    const name = { name: user.name };
    const publisher = OT.initPublisher(`video-${user.id}`, R.merge(cameraProperties, name));
    session.publish(publisher, handleError);
  }

  subscribe(user) {
    const { session } = this.state;
    const name = { name: user.name };
    session.subscribe(user.stream,`video-${user.id}`, R.merge(cameraProperties, name));
  }

  onConnect() {
    this.setState({ connected: true })
    const { session } = this.state;
    session.on('streamCreated', e => this.onStreamCreated(e.stream));
    session.on('streamDestroyed', e => this.onStreamDestroyed(e.stream));
    this.publish();
  }

  connectToSession(credentials) {
    const { apiKey, sessionId, token } = credentials;
    const session = OT.initSession(apiKey, sessionId);
    this.setState({ session }, () => session.connect(token, this.onConnect));
  }

  onStreamCreated(stream) {
    const { students } = this.state
    const joined = R.merge(JSON.parse(R.path(['connection', 'data'], stream)), { stream });
    const role = joined.role;
    const userUpdate = role === 'instructor' ? { instructor: joined } : { students: R.append(joined, students) };
    this.setState(userUpdate, () => this.subscribe(joined))

  }

  onStreamDestroyed(stream) {
    console.log('stream destroyed', stream);
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    const { students } = this.state;
    api.get(`classroom/${this.props.params.id}?id=${user.id}`)
      .then(response => {
        const { classroom, credentials } = response;
        const role = user.role;
        const userUpdate = role === 'instructor' ? { instructor: user } : { students: R.append(user, students) };
        dispatch(setClassroom(classroom));
        this.setState(R.merge({ classroom }, userUpdate), () => this.connectToSession(credentials));
      });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetClassroom());
  }

  render() {
    const { instructor, students, connected, error } = this.state;
    return (
      <div className="Classroom">
        { !connected && connectingMask() }
        <div>
          <Podium instructor={instructor} />
          <Students students={students} />
        </div>
        { error && errorMask() }
      </div>
    )
  }
}

const mapStateToProps = state => R.pick(['user']);

export default withRouter(connect(
  mapStateToProps
)(Classroom));
