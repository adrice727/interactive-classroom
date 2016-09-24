import React, { Component } from 'react';
import './Podium.css';


class Podium extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { instructor } = this.props;
    return (
      <div className="Podium">
        { instructor ? <div id={`video-${instructor.id}`} className="Podium-video"></div> : '' }
      </div>
    )
  }
}


export default Podium;
