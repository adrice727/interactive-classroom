import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import './Podium.css';
import instructorIcon from '../../../images/instructor.png'

const Instructor = ({ id }) => <div id={`video-${id}`} className="Podium-video"></div>;

const Waiting = () =>
  <div className="Podium-waiting">
    <img className="Podium-waiting-image" role="presentation" src={instructorIcon}></img>
    <div className="Podium-waiting-text">Waiting for Instructor to Arrive</div>
   </div>

class Podium extends Component {

  render() {
    const { classroom } = this.props
    const { instructor } = classroom;
    return (
      <div className="Podium">
        { instructor ? <Instructor id={instructor.id}/> : <Waiting /> }
      </div>
    )
  }
}

const mapStateToProps = state => R.pick(['user', 'classroom']);

export default connect(
  mapStateToProps
)(Podium);
