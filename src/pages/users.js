import { Router } from '@reach/router';
import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import Config from '../components/users/Config';
import Login from '../components/users/Login';
import Profile from '../components/users/Profile';
import Register from '../components/users/Register';

const User = () => (
	<React.Fragment>
		<Router>
			<PrivateRoute path='/users/profile' component={Profile} />
			<PrivateRoute path='/users/:id' component={Config} />
			<Login path='/users/login' />
			<Register path='/users/register' />
		</Router>
	</React.Fragment>
);

export default User;
