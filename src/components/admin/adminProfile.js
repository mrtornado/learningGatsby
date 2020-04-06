import React from 'react';
import { Query } from 'react-apollo';
import { ME } from '../../utils/graphql/userGraph';

const AdminProfile = () => {
	return (
		<Query query={ME}>
			{({ loading, error, data }) => {
				if (loading) return 'Loading...';
				if (error)
					return `Error! ${error.message}. Congrats you are a great hacker !! :))))`;

				return (
					<React.Fragment>
						<h2> Hello it's me ! {data.me.username}</h2>
					</React.Fragment>
				);
			}}
		</Query>
	);
};

export default AdminProfile;
