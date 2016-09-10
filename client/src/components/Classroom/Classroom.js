import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../../services/api';
import R from 'ramda';
import './Classroom.css';

const Podium = ({}) => <div className="Podium">Podium goes here</div>


const Students = ({}) => <div className="Students">Students go here</div>

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = { classroom: null }
  }

  componentDidMount() {
    api.get(`classroom/${this.props.params.id}`)
    .then(classroom => this.setState({ classroom }));
  }

  render() {
    const classroom  = R.defaultTo({})(this.state.classroom);
    const ifExists = R.defaultTo('');
    return (
      <div className="Classroom">
        <div className="Classroom-info">
          <div>
            <span className="label">Class:</span>
            <span className="data">{ ifExists(classroom.name) }</span>
          </div>
          <div>
            <span className="label">Instructor:</span>
            <span className="data">{ ifExists(classroom.instructorName) }</span>
          </div>
        </div>
        <Podium />
        <Students />
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  currentUser: state.currentUser
});

export default withRouter(connect(
  mapStateToProps
)(Classroom));
