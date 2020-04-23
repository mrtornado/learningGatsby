import { Router } from '@reach/router';
import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import AdminProfile from '../components/admin/AdminProfile';
import Users from '../components/admin/Users';
import Search from '../components/admin/Search';
import UserEdit from '../components/admin/UserEdit';
import EditConfig from '../components/admin/EditConfig';

const Admin = () => (
	<React.Fragment>
		<Router>
			<PrivateRoute path='/admin/profile' component={AdminProfile} />
			<PrivateRoute path='/admin/users/:id' component={UserEdit} />
			<PrivateRoute path='/admin/users/:id/:id' component={EditConfig} />
			<PrivateRoute path='/admin/users' component={Users} />
			<PrivateRoute path='/admin/search' component={Search} />
		</Router>
	</React.Fragment>
);

export default Admin;
