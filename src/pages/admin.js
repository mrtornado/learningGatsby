import { Router } from '@reach/router';
import React from 'react';
import PrivateRoute from '../components/privateRoute';
import AdminProfile from '../components/admin/adminProfile';
import Users from '../components/admin/users';
import Search from '../components/admin/search';
import UserEdit from '../components/admin/userEdit';

const Admin = () => (
	<React.Fragment>
		<Router>
			<PrivateRoute path='/admin/profile' component={AdminProfile} />
			<PrivateRoute path='/admin/users/:id' component={UserEdit} />
			<PrivateRoute path='/admin/users' component={Users} />
			<PrivateRoute path='/admin/search' component={Search} />
		</Router>
	</React.Fragment>
);

export default Admin;
