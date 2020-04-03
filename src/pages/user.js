import { Router } from '@reach/router';
import React from 'react';
import PrivateRoute from '../components/privateRoute';
import Config from '../components/users/config';
import Login from '../components/users/login';
import Profile from '../components/users/profile';
import Register from '../components/users/register';

const User = () => (
	<React.Fragment>
		<Router>
			<PrivateRoute path='/user/profile' component={Profile} />
			<PrivateRoute path='/user/:id' component={Config} />
			<Login path='/user/login' />
			<Register path='/user/register' />
		</Router>
	</React.Fragment>
);

export default User;
