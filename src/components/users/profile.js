import React from 'react';
import { decodedToken } from '../../utils/auth';
import AdminProfile from '../admin/AdminProfile';
import UserProfile from './UserProfile';

const Profile = () => {
	const isAdmin = decodedToken();
	if (isAdmin.member_type === 'admin') {
		return <AdminProfile />;
	}
	return <UserProfile />;
};

export default Profile;
