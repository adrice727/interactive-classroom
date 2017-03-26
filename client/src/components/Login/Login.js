// @flow
import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';
import api from '../../services/api';
import { authenticate } from '../../actions/user';
import googleLogo from '../../images/google.jpg'
import './Login.css'


type BaseProps = { user: User };
type DispatchProps = { authenticateUser: UserRole => void };
type Props = BaseProps & DispatchProps;

class Login extends Component {

  props: Props;
  state: { error: null, instructor: boolean, role: UserRole };
  toggleInstructor: SyntheticInputEvent => void;
  constructor(props) {
    super(props);
    this.state = { error: null, instructor: false, role: 'student' };
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
    const instructor = e.target.checked;
    const role: UserRole = instructor ? 'instructor' : 'student';
    this.setState({ instructor, role });
  }

  render() {
    const { toggleInstructor } = this;
    const { error, instructor, role } = this.state;
    const { authenticateUser } = this.props;
    return (
      <div className='Login'>
        <h2 className='Login-header grey'> Sign In</h2>
        <div className='Login-error red'>
          { this.state.error ? this.state.error : ''}
        </div>
        <button className='Login-button' onClick={R.partial(authenticateUser, [role])}>
          <img src={googleLogo} />
        </button>
        <div className="Login-instructor">
          <input type="checkbox" name="instructor" value={instructor} onChange={toggleInstructor}/>
          <span className="label">Log in as Instructor</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State): BaseProps => R.pick(['user'], state);

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = (dispatch: Dispatch): DispatchProps =>
  ({
    authenticateUser: (role: UserRole) => {
      dispatch(authenticate(role));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
