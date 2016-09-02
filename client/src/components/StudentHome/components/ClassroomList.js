import React from 'react';
import R from 'ramda';
import './ClassroomList.css';

const createList = classrooms => {
  const getClass = id => R.prop(id, classrooms);
  return R.map(getClass, R.keys(classrooms));
}

const ClassroomItem = ({ classroom, remove }) => {
  const boundRemove = remove ? remove.bind(this, classroom.id) : null;
  return (
    <li>
      <div className="info-container">
        <div>
          <span className="label name">NAME: </span><span className="text name">{classroom.name}</span>
        </div>
        <div>
          <div className="label description">DESCRIPTION:</div>
          <div className="text description">{classroom.description}</div>
        </div>
      </div>
      <div className="action-container">
        <a className="link btn blue" href={`classroom/${classroom.id}`}>Join</a>
        { remove ? <button className="delete btn red" onClick={boundRemove}>Remove</button> : '' }
      </div>
    </li>
  )
}

const ClassroomList = ({classrooms, removeClassroom}) => {
  const list = createList(classrooms);
  return (
      <div className="ClassroomList">
        { R.isEmpty(list) ? <div className="emptyList">No existing classes</div> :
        <ul>
          { list.map(classroom => <ClassroomItem key={classroom.id} classroom={classroom} remove={removeClassroom} />) }
        </ul>
        }
      </div>
  )
};

export default ClassroomList;
