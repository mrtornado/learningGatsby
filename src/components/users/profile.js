import React from 'react';
import { Query } from 'react-apollo';
import { CONFIGS_USER } from '../../utils/graphql/userGraph';
import Link from '../material/Link';

const Profile = () => {
	return (
		<Query query={CONFIGS_USER}>
			{({ loading, error, data }) => {
				if (loading) return 'Loading...';
				if (error) return `Error! ${error.message}`;

				return (
					<div>
						<h3>Return Active configs:</h3>
						<div>
							{data.me.config.map((cfg) => {
								const postFilter = cfg.subscr[0].subscrTxn.filter(
									(y) => y.txn_type === 'payment'
								);
								const endtime = postFilter[postFilter.length - 1].end_time;
								const date = new Date();
								if (endtime > date) {
									return (
										<div key={cfg.config_key}>
											<Link to={`/user/${cfg.config_key}`}>
												{' '}
												{cfg.config_name}{' '}
											</Link>{' '}
											- config_key: {cfg.config_key} - Subscription ID :{' '}
											{cfg.subscr[0].subscr_id}
										</div>
									);
								} else {
									return null;
								}
							})}
						</div>
						<h3>Return Expired configs:</h3>
						<div>
							{data.me.config.map((cfg) => {
								const postFilter = cfg.subscr[0].subscrTxn.filter(
									(y) => y.txn_type === 'payment'
								);
								const endtime = postFilter[postFilter.length - 1].end_time;
								const date = new Date();
								if (endtime < date) {
									return (
										<div key={cfg.config_key}>
											{cfg.config_name} - config_key: {cfg.config_key} -
											Subscription ID : {cfg.subscr[0].subscr_id}
										</div>
									);
								} else {
									return null;
								}
							})}
						</div>
					</div>
				);
			}}
		</Query>
	);
};

export default Profile;
