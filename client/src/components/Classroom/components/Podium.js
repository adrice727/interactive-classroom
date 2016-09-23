import React, { Component } from 'react';
import './Podium.css';

class Podium extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Podium">
        <div id="instructorVideo" className="videoContainer"></div>
      </div>
    )
  }
}


export default Podium;
