/* global OT */
import React, { Component } from 'react';
import Spinner from 'react-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../../services/api';
import { setActiveClassroom } from '../../actions/activeClassroomActions';
import { addCredentials } from '../../actions/currentUserActions';
import R from 'ramda';
import Podium from './components/Podium';
import Students from './components/Students';
import './Classroom.css';

const connectingMask = () =>
  <div className="Classroom-connecting-mask">
    <Spinner />
    <div className="message">Connecting to Classroom</div>
  </div>

const classroomView = classroom =>
  <div>
    <Podium classroom={classroom} />
    <Students classrooms={classroom} />
  </div>



class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroom: null,
      session: null,
      instructor: null,
      students: [],
      connected: false,
    }
    this.connectToSession = this.connectToSession.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.publish = this.publish.bind(this);
  }

  publish() {
    const { session } = this.state;
    const { user } = this.props;
    OT.initPublisher('instructorVideo', {}, e => console.log(e));
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
    console.log('stream created', stream);
  }

  onStreamDestroyed(stream) {
    console.log('stream destroyed', stream);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    api.get(`classroom/${this.props.params.id}?id=${user.id}`)
      .then(response => {
        const { classroom, credentials } = response;
        dispatch(setActiveClassroom(classroom));
        dispatch(addCredentials(credentials));
        // const { credentials, classroom } = response;
        // this.setState({ credentials, classroom });
        // this.connectToSession(credentials);
      });
  }

  render() {
    // const classroom = R.defaultTo({})(this.state.classroom);
    // const { classroom } = this.props;
    // const { connected } = this.state;
    return null;
    return (
      <div className="Classroom">
        <div className="Classroom-info">
          <div>
            <span>{ `${classroom.title} with ${classroom.instructorName}` }</span>
          </div>
        </div>
        { !connected ? connectingMask() : classroomView(classroom) }
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  user: state.currentUser,
  classroom: state.classrooms.current
});

export default withRouter(connect(
  mapStateToProps
)(Classroom));
