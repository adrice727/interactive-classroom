import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
//import { withRouter, browserHistory } from 'react-router';
//import { connect } from 'react-redux';
//import R from 'ramda';
//import api from '../../services/api';
//import { loginUser } from '../../actions/userActions';
//import { setInstructor } from '../../actions/instructorActions';
import FirebaseAuth from './components/FirebaseAuth';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onAuth = this.onAuth.bind(this);
    this.onError = this.onError.bind(this);
  }

  static navigationOptions = {
    title: 'OpenTok Classroom - Login'
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      browserHistory.push(`${user.role}-home`);
    }
  }

  onAuth(role, data) {
    console.log(role, data);
    return;

    const { dispatch } = this.props;

    const user = {
      id: R.path(['user', 'uid'], data),
      name: R.path(['user', 'displayName'], data),
      email: R.path(['user', 'email'], data),
      imageURL: R.path(['user', 'photoURL'], data),
      role
    };

    const login = user => {
      dispatch(loginUser(user));
      if (role === 'instructor') {
        dispatch(setInstructor(user));
      }
      // browserHistory.push(`/${role}-home`);
    };

    api.post('user', R.omit('role', user))
      .then(response => login(user))
      .catch(error => console.log(error));

  }

  onError(error) {
    console.log(error);
    return;
    this.setState({ error });
  }

  render() {
    return (
      <View style={styles.Login}>
        <Text style={styles.LoginHeader}>
          Login with Google
        </Text>
        <View style={styles.LoginComponentContainer}>
          <FirebaseAuth onAuth={this.onAuth} onError={this.onError} />
        </View>
      </View>
    );
  }
};

// export default class Login extends Component {
// return (
//     <div className='Login'>
//       <div>
//           <div className='Login-main'>
//           <div className='Login-content'>
//             <div className='Login-component-container'>
//               <h2 className='Login-subheader grey'> Sign In</h2>
//               <div className='Login-error red'>
//                 { this.state.error ? this.state.error : ''}
//               </div>
//               <FirebaseAuth onAuth={this.onAuth} onError={this.onError} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

// }

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  LoginHeader: {
    fontSize: 20,
    fontFamily: 'Menlo',
    textAlign: 'center',
    marginTop: 60,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// const mapStateToProps = (state, { params }) => ({
//   user: state.user,
// });

// export default withRouter(connect(
//   mapStateToProps
// )(Login));
