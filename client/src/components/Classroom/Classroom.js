import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import R from 'ramda';
import './Classroom.css';

const Classroom = ({children}) => {
  return (
    <div className="Classroom">
      Welcome to class, motherfuckers!
    </div>
  )
}


const mapStateToProps = (state, { params }) => ({
  currentUser: state.currentUser
});

export default withRouter(connect(
  mapStateToProps
)(Classroom));

