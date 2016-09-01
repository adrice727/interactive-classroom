import React from 'react';
import R from 'ramda';
import './ClassroomList.css';

const Classroom = ({ classroom }) => {
  return (
    <li>
      <div className="info">
        <div>
          <span className="label name">NAME: </span><span className="text name">{classroom.name}</span>
        </div>
        <div>
          <div className="label description">DESCRIPTION:</div>
          <div className="text description">{classroom.description}</div>
        </div>
      </div>
      <a className="link btn blue" href={`classroom/${classroom.id}`}>Go</a>
    </li>
  )
}

const ClassroomList = ({ classrooms }) =>
  (<div className="ClassroomList">
    { R.isEmpty(classrooms) ? <div className="emptyList">No existing classes</div> :
        <ul>
          { classrooms.map( classroom => <Classroom key={classroom.id} classroom={classroom} />) }
        </ul>
    }
    </div>)

export default ClassroomList;
