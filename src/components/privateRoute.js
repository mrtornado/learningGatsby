import { navigate } from 'gatsby';
import React from 'react';
import { isLoggedIn } from '../utils/auth';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
	if (!isLoggedIn() && location.pathname !== `/users/login`) {
		// If the user is not logged in, redirect to the login page.
		navigate(`/users/login`);
		return null;
	}

	return <Component {...rest} />;
};

export default PrivateRoute;
