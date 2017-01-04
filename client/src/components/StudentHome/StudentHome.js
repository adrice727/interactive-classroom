import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import R from 'ramda';
import api from '../../services/api';
import { setAvailableClasses } from '../../actions/availableClassesActions';
import StudentClassList from './components/StudentClassList';
import './StudentHome.css';

class StudentHome extends Component {

  componentDidMount() {
    const { user, dispatch } = this.props;
    if (user) {
      api.get('classrooms')
      .then(classrooms => dispatch(setAvailableClasses(classrooms)))
      .catch(error => console.log(error));
    } else {
      browserHistory.push('/login');
    }
  }

  render() {
    const { availableClasses } = this.props;
    return (
      <div className="StudentHome">
        <div className="StudentHome-current">
          <h2 className="StudentHome-header">Available Classes</h2>
          <StudentClassList classrooms={availableClasses} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => R.pick(['user', 'availableClasses'], state);

export default connect(
  mapStateToProps
)(StudentHome);
