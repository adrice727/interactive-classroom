import React from 'react';
import R from 'ramda';
import './StudentClassList.css';

const createList = classrooms => {
  const getClass = id => R.prop(id, classrooms);
  return R.map(getClass, R.keys(classrooms));
}

const ClassroomItem = ({ classroom, remove }) => {
  const {name, instructorName, description,id } = classroom;
  return (
    <li>
      <div className="info-container">
        <div>
          <span className="label name">NAME: </span><span className="text name">{name}</span>
        </div>
        <div>
          <span className="label instructor">INSTRUCTOR: </span><span className="text name">{instructorName}</span>
        </div>
        <div>
          <div className="label description">DESCRIPTION:</div>
          <div className="text description">{description}</div>
        </div>
      </div>
      <div className="action-container">
        <a className="link btn blue" href={`classroom/${id}`}>Join</a>
      </div>
    </li>
  )
}

const StudentClassList = ({classrooms, removeClassroom}) => {
  const list = createList(classrooms);
  return (
      <div className="StudentClassList">
        { R.isEmpty(list) ? <div className="emptyList">No existing classes</div> :
        <ul>
          { list.map(classroom => <ClassroomItem key={classroom.id} classroom={classroom} remove={removeClassroom} />) }
        </ul>
        }
      </div>
  )
};

export default StudentClassList;
