// @flow
import React, { Component } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { browserHistory, withRouter, Link } from 'react-router';
import { signOut } from '../../actions/auth';
import { setInstructor } from '../../actions/instructor';
import './Header.css';
import mainLogo from './logo.svg';
import smallLogo from './opentok.png';

type NavProps = { logout: Unit, location: Location };
const HeaderNav = ({ logout, location }: NavProps): ReactComponent => {
  const atHome = location.pathname === '/home';
  return (
    <span className="Header-Nav">
      { !atHome &&
        <Link to="home">
          <button className="Header-logout btn transparent">Home</button>
        </Link>
      }
      <button className="Header-logout btn transparent" onClick={logout}>Log out</button>
    </span>
  );
};

type BaseProps = {
  user: User,
  location: Location
};

type DispatchProps = {
  logout: Unit
};

type Props = BaseProps & DispatchProps;

class Header extends Component {

  constructor(props: Props) {
    super(props);
  }

  render(): ReactComponent {
    const { user, classroom, location, logout } = this.props;
    const classroomLogo = R.pathOr(smallLogo, ['imageURL'], classroom);
    const currentClassroom = classroom && !R.isEmpty(classroom);

    return (
      <div className="Header">
        <span className="Header-text opentok">
          <img src={classroomLogo} alt="Classroom Logo" />
          {currentClassroom ? `${classroom.title} with ${classroom.instructorName}` : 'OpenTok Classroom' }
        </span>
        { user ?
          <HeaderNav user={user} logout={logout} location={location} /> :
          <img className="Header-logo" src={mainLogo} alt="TokBox Logo" />
        }
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<BaseProps> = (state: State): BaseProps => R.pick(['user', 'classroom'], state);

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = (dispatch: Dispatch): DispatchProps => ({
  logout: (): void => dispatch(signOut()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header));
