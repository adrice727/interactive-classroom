// @flow
import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import StudentHome from './components/StudentHome/StudentHome';
import InstructorHome from '../InstructorHome/InstructorHome';

type Props = { user: User };
const Home = ({ user }: Props): ReactComponent => user.role === 'student' ? <StudentHome /> : <InstructorHome />;
const mapStateToProps = (state: State): Props => R.pick(['user'], state);
export default connect(mapStateToProps)(Home);
