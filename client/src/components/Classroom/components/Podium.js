import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import './Podium.css';


class Podium extends Component {

  render() {
    const { classroom } = this.props
    const { user, instructor } = classroom;
    return (
      <div className="Podium">
        { instructor ? <div id={`video-${instructor.id}`} className="Podium-video"></div> : '' }
      </div>
    )
  }
}

const mapStateToProps = state => R.pick(['user', 'classroom']);

export default connect(
  mapStateToProps
)(Podium);
