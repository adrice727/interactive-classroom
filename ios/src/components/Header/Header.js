import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
// import mainLogo from './logo.svg';
import smallLogo from './opentok.png';

// const path = () => window.location.pathname.split('/')[1];

// const HeaderNav = ({ user, logout, goHome }) => {
//   const currentlyHome = path === `${user.role}-home`
//   return (
//     <span className="Header-Nav">
//       { !currentlyHome && <button className="Header-logout btn transparent" onClick={goHome}>Home</button> }
//       <button className="Header-logout btn transparent" onClick={logout}>Log out</button>
//     </span>
//   )
// };

// class Header extends Component {

//   constructor(props) {
//     super(props);
//     this.onLogout = this.onLogout.bind(this);
//     this.goHome = this.goHome.bind(this);
//   }

//   onLogout() {
//     const { dispatch, user } = this.props;
//     if (user.role === 'instructor') {
//       dispatch(setInstructor(null))
//     }
//     dispatch(logoutUser());
//     browserHistory.push('/');
//   }

//   goHome() {
//     const role = this.props.user.role;
//     browserHistory.push(`/${role}-home`);
//   }

//   render() {
//     const { user, classroom } = this.props;
//     const classroomLogo =  R.pathOr(smallLogo, ['imageURL'], classroom);
//     const currentClassroom = classroom && !R.isEmpty(classroom)

//     return (
//       <div className="Header">
//         <span className="Header-text opentok">
//             <img src={classroomLogo} alt="Classroom Logo" />
//             {currentClassroom ? `${classroom.title} with ${classroom.instructorName}` : 'OpenTok Classroom' }
//         </span>
//         { user ?
//           <HeaderNav user={user} logout={this.onLogout} goHome={this.goHome} /> :
//           <img className="Header-logo" src={mainLogo} alt="TokBox Logo" />
//         }
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => R.pick(['user', 'classroom'], state);

// export default connect(
//   mapStateToProps
// )(Header);

export default class Header extends Component {
  render () {
    <View style={styles.header}>
      <Image style={styles.headerImage} src={smallLogo} />
    </View>
  }
}


const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  headerImage: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 60,
  },
});



