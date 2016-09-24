/* global OT */
import React, { Component } from 'react';
import Spinner from 'react-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../../services/api';
import { cameraProperties } from '../../services/opentok';
// import { setclassroom, setClassroomSession } from '../../actions/classroomActions';
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

const classroomView = classroom =>
  <div>
    <Podium classroom={classroom} />
    <Students classrooms={classroom} />
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

  createPublisher() {
    const { session } = this.state;
    const { user } = this.props;
    const container = user.role === 'instructor' ? 'instructVideo' : `student-${user.id}`;
    const publisher = OT.initPublisher(container, cameraProperties);
    this.setState({ readyToPublish: true });
  }

  onError(error) {
    this.setState({ error })
  }


  publish() {
    const { session } = this.state;
    const { user } = this.props;
    const handleError = error => error && this.onError(error);
    const publisher = OT.initPublisher(`video-${user.id}`, cameraProperties);
    session.publish(publisher, handleError);
    console.log('pub object', publisher);
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
    const joined = JSON.parse(R.path(['connection', 'data'], stream));
    const role = joined.role;
  }

  onStreamDestroyed(stream) {
    console.log('stream destroyed', stream);
  }

  componentDidMount() {
    const { user } = this.props;
    const { students } = this.state;
    api.get(`classroom/${this.props.params.id}?id=${user.id}`)
      .then(response => {
        const { classroom, credentials } = response;
        const role = user.role;
        const userUpdate = role === 'instructor' ? { instructor: user } : { students: R.append(user, students) };
        this.setState(R.merge({ classroom }, userUpdate), () => this.connectToSession(credentials));
      });
  }

  render() {
    const { classroom, instructor, students, connected, error } = this.state;
    return (
      <div className="Classroom">
        { classroom && classroomInfo(classroom) }
        { !connected && connectingMask() }
        <div>
          <Podium classroom={instructor} />
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
