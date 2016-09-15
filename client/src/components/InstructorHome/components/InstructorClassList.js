import React from 'react';
import R from 'ramda';
import './InstructorClassList.css';
import classroomIcon from '../../../images/classroom-icon.png';

const createList = classrooms => {
  const getClass = id => R.prop(id, classrooms);
  return R.map(getClass, R.keys(classrooms));
}

const ClassroomItem = ({ classroom, remove }) => {
  const boundRemove = remove.bind(this, classroom.id);
  const { title, imageURL, id } = classroom;
  const imageSrc = R.defaultTo(classroomIcon)(imageURL);
  return (
    <li>
      <div className="primary-container">
        <div className="image-container">
          <img className="classroomImage" src={imageSrc} alt="classroom-icon" />
        </div>
        <div className="title-container">
            <span className="title">{title}</span>
        </div>
      </div>
      <div className="action-container">
        <a className="link btn blue" href={`classroom/${id}`}>Join</a>
        <button className="delete btn red" onClick={boundRemove}>Remove</button>
      </div>
    </li>
  )
}

const InstructorClassList = ({classrooms, removeClassroom}) => {
  const list = createList(classrooms);
  return (
      <div className="InstructorClassList">
        { R.isEmpty(list) ? <div className="emptyList">No existing classes</div> :
        <ul>
          { list.map(classroom => <ClassroomItem key={classroom.id} classroom={classroom} remove={removeClassroom} />) }
        </ul>
        }
      </div>
  )
};

export default InstructorClassList;
