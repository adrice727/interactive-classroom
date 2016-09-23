/* global OT */
import React, { Component } from 'react';
import Spinner from 'react-spinner';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../../services/api';
import R from 'ramda';
import Podium from './components/Podium';
import Students from './components/Students';
import './Classroom.css';

const connectingMask = () =>
  <div className="Classroom-connecting-mask">
    <Spinner spinnerName="three-bounce" />
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
  }

  connectToSession(credentials) {
    const { apiKey, sessionId, token } = credentials;
    const session = OT.initSession(apiKey, sessionId);
    this.setState({ session });
    session.on('streamCreated', e => this.onStreamCreated(e.stream));
  }

  onStreamCreated(stream) {

  }

  componentDidMount() {
    const { user } = this.props;
    api.get(`classroom/${this.props.params.id}?id=${user.id}`)
      .then(response => {
        const { credentials, classroom } = response;
        this.setState({ credentials, classroom });
        this.connectToSession(credentials);
      });
  }

  render() {
    const classroom = R.defaultTo({})(this.state.classroom);
    const { connected } = this.state;

    return (
      <div className="Classroom">
        <div className="Classroom-info">
          <div>
            <span>{ `${classroom.title} with ${classroom.instructorName}` }</span>
          </div>
        </div>
        { connected ? connectingMask : classroomView(classroom) }
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  user: state.currentUser
});

export default withRouter(connect(
  mapStateToProps
)(Classroom));
