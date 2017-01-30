import React from 'react';
import {View, ScrollView} from 'react-native';
import R from 'ramda';
import classroomIcon from '../../../images/classroom-icon.png';

const ClassroomItem = ({ classroom, remove }) => {
  const { title, instructorName, description, imageURL, id } = classroom;
  const imageSrc = R.defaultTo(classroomIcon)(imageURL);
  return (

    // <li>
    //   <div className="image-container">
    //     <img className="classroomImage" src={imageSrc} alt="classroom-icon" />
    //   </div>
    //   <div className="info-container">
    //     <div>
    //       <span className="title">{title}</span>
    //       <span className="seperator">{`•`}</span>
    //       <span className="instructor">{instructorName}</span></div>
    //     <div className="description">{description}</div>
    //   </div>
    //   <div className="action-container">
    //     <a className="link btn white" href={`classroom/${id}`}>Join</a>
    //   </div>
    // </li>

    <View>

    </View>
  )
}


const StudentClassList = ({ classrooms, removeClassroom }) => {
  return (
    <ScrollView>
      { R.map(classroom => <ClassroomItem key={classroom.id} classroom={classroom} remove={removeClassroom} />)(classrooms) }
    </ScrollView>
  )
};

export default StudentClassList;
