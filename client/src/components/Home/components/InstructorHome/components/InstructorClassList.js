import React from 'react';
import R from 'ramda';
import './InstructorClassList.css';
import classroomIcon from '../../../../../images/classroom-icon.png';

const ClassroomItem = ({ classroom, remove }) => {
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
        <a className="link btn white" href={`classroom/${id}`}>Join</a>
        <button className="delete btn white" onClick={R.partial(remove, [id])}>Remove</button>
      </div>
    </li>
  )
}

const NoClasses = () => <div className="emptyList">No existing classes</div>;

const InstructorClassList = ({classrooms, removeClassroom}) => {
  const list = Object.values(classrooms);
    const List = () =>
      <ul>
        { R.map(classroom => <ClassroomItem key={classroom.id} classroom={classroom} remove={removeClassroom} />)(list) }
      </ul>

  return (
      <div className="InstructorClassList">
        { R.isEmpty(list) ? <NoClasses /> : <List /> }
      </div>
  )
};

export default InstructorClassList;
