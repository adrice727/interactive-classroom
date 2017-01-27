import React from 'react';
import R from 'ramda';
import './StudentClassList.css';
import classroomIcon from '../../../images/classroom-icon.png';

const ClassroomItem = ({ classroom, remove }) => {
  const { title, instructorName, description, imageURL, id } = classroom;
  const imageSrc = R.defaultTo(classroomIcon)(imageURL);
  return (
    <li>
      <div className="image-container">
        <img className="classroomImage" src={imageSrc} alt="classroom-icon" />
      </div>
      <div className="info-container">
        <div>
          <span className="title">{title}</span>
          <span className="seperator">{`•`}</span>
          <span className="instructor">{instructorName}</span></div>
        <div className="description">{description}</div>
      </div>
      <div className="action-container">
        <a className="link btn white" href={`classroom/${id}`}>Join</a>
      </div>
    </li>
  )
}

const NoClasses = () => <div className="emptyList">No existing classes</div>;

const StudentClassList = ({ classrooms, removeClassroom }) => {
  const list = Object.values(classrooms);
  const List = () =>
    <ul>
      { R.map(classroom => <ClassroomItem key={classroom.id} classroom={classroom} remove={removeClassroom} />)(list) }
    </ul>

  return (
    <div className="StudentClassList">
      { R.isEmpty(list) ? <NoClasses /> : <List /> }
    </div>
  )
};

export default StudentClassList;
