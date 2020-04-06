import React from 'react';
import { decodedToken } from '../../utils/auth';
import AdminProfile from '../admin/adminProfile';
import UserProfile from './userProfile';

const Profile = () => {
	const isAdmin = decodedToken();
	if (isAdmin.member_type === 'admin') {
		return <AdminProfile />;
	}
	return <UserProfile />;
};

export default Profile;
