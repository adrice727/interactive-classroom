// @flow
import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';
import api from '../../services/api';
import { loginUser } from '../../actions/user';
import { setInstructor } from '../../actions/instructor';
import googleLogo from '../../images/google.jpg'
import './Login.css'


type BaseProps = {
  user: User
};
type Props = BaseProps;



class Login extends Component {

  props: Props;
  state: { error: null, instructor: boolean };
  toggleInstructor: SyntheticInputEvent => void;
  constructor(props) {
    super(props);
    this.state = { error: null, instructor: false };
    this.toggleInstructor = this.toggleInstructor.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      browserHistory.push(`${user.role}-home`);
    }
  }

  // onAuth(role, data) {

  //   const { dispatch } = this.props;

  //   const user = {
  //     id: R.path(['user', 'uid'], data),
  //     name: R.path(['user', 'displayName'], data),
  //     email: R.path(['user', 'email'], data),
  //     imageURL: R.path(['user', 'photoURL'], data),
  //     role
  //   };

  //   const login = user => {
  //     dispatch(loginUser(user));
  //     if (role === 'instructor') {
  //       dispatch(setInstructor(user));
  //     }
  //     browserHistory.push(`/${role}-home`);
  //   };

  //   api.post('user', R.omit('role', user))
  //     .then(response => login(user))
  //     .catch(error => console.log(error));

  // }

  toggleInstructor(e: SyntheticInputEvent) {
    const field = e.target.name;
    const checked = e.target.checked;
    this.setState({ instructor: checked });
  }

  render() {
    return (
      <div className='Login'>
        <h2 className='Login-header grey'> Sign In</h2>
        <div className='Login-error red'>
          { this.state.error ? this.state.error : ''}
        </div>
        <button className='Login-button' onClick={() => console.log('click')}>
          <img src={googleLogo} />
        </button>
        <div className="Login-instructor">
          <input type="checkbox" name="instructor" value={this.state.instructor} onChange={this.toggleInstructor}/>
          <span className="label">Log in as Instructor</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  user: state.user,
});

export default withRouter(connect(
  mapStateToProps
)(Login));
