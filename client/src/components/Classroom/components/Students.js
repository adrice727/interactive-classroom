import React from 'react';
import './Students.css';

const Student = ({student}) =>
  <div className="Student" id={`video-${student.id}`}></div>

const Students = ({students}) =>
  <div className="Students">
    { students.map(student => <Student student={student} key={student.id} />)}
  </div>


export default Students;