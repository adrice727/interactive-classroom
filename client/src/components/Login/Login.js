// @flow
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';
import { authenticate } from '../../actions/auth';
import googleLogo from '../../images/google.jpg';
import './Login.css';


type BaseProps = { user: User };
type DispatchProps = { authenticateUser: UserRole => void };
type Props = BaseProps & DispatchProps;

class Login extends Component {

  props: Props;
  state: { error: null, instructor: boolean, role: UserRole };
  toggleInstructor: SyntheticInputEvent => void;
  constructor(props: Props) {
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

  toggleInstructor(e: SyntheticInputEvent) {
    const instructor = e.target.checked;
    const role: UserRole = instructor ? 'instructor' : 'student';
    this.setState({ instructor, role });
  }

  render(): ReactComponent {
    const { toggleInstructor } = this;
    const { instructor, role } = this.state;
    const { authenticateUser } = this.props;
    return (
      <div className="Login">
        <h2 className="Login-header grey"> Sign In</h2>
        <div className="Login-error red">
          { this.state.error ? this.state.error : ''}
        </div>
        <button className="Login-button" onClick={R.partial(authenticateUser, [role])}>
          <img src={googleLogo} alt="google-login" />
        </button>
        <div className="Login-instructor">
          <input type="checkbox" name="instructor" value={instructor} onChange={toggleInstructor} />
          <span className="label">Log in as Instructor</span>
        </div>
      </div>
    );
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
