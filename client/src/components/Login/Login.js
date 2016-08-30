import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';
import api from '../../services/api';
import { loginUser } from '../../actions/user';
import './Login.css'
import FirebaseLogin from './components/FirebaseLogin';

// const updateUser = data => {
//   const user = {
//     id: R.path(['user', 'uid'], data),
//     name: R.path(['user', 'displayName'], data),
//     email: R.path(['user', 'email'], data),
//     photoURL: R.path(['user', 'photoURL'], data),
//     credential: R.path(['credential'], data)
//   };
// };

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onLogin = this.onLogin.bind(this);
    this.onError = this.onError.bind(this);
    this.onUserValidated = this.onUserValidated.bind(this);
  }

  onUserValidated(user) {
    console.log('989898', user);
  }

  onLogin(data) {

    const user = {
      id: R.path(['user', 'uid'], data),
      name: R.path(['user', 'displayName'], data),
      email: R.path(['user', 'email'], data),
      imageURL: R.path(['user', 'photoURL'], data)
    };

    api.post('user', { user })
    .then(valid => this.onUserValidated(Object.assign(user, { role: this.props.role })))
    .catch(error => console.log('podfpodpfo', error));

  }

  onError(error) {
    this.setState({ error });
  }

  render() {
    return (
      <div className='Login'>
        <div>
            <div className='Login-main'>
            <div className='Login-content'>
              <div className='Login-component-container'>
                <h2 className='Login-subheader grey'> Sign In</h2>
                <div className='Login-error red'>
                  { this.state.error ? this.state.error : ''}
                </div>
                <FirebaseLogin onLogin={this.onLogin} onError={this.onError} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  user: state.user,
  role: R.path(['role'], params) || 'student'
});

// const mapDispatchToProps = dispatch =>
//   ({
//      onUserValidated: user => {
//        dispatch({
//          type: 'LOGIN_USER',
//          user
//        })
//      }
//   })

export default withRouter(connect(
  mapStateToProps,
  { onUserValidated: loginUser }
)(Login));

