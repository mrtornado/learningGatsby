import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USER_EDIT } from '../../utils/graphql/adminGraph';
import Link from '../../components/material/Link';
import AddConfig from './addConfig';

const UserEdit = (props) => {
	const key = parseInt(props.id);

	const { loading, error, data } = useQuery(USER_EDIT, {
		variables: { member_key: key },
	});

	if (loading) return <p>Loading ...</p>;
	if (error) return `Error! ${error.message}`;

	return (
		<React.Fragment>
			<div>
				<AddConfig id={key} />
				<h3>Active subscriptions:</h3>
				<div>
					{data.member.config.map((cfg) => {
						const postFilter = cfg.subscr[0].subscrTxn.filter(
							(y) => y.txn_type === 'payment'
						);
						const endtime = postFilter[postFilter.length - 1].end_time;

						const date = new Date();

						if (endtime > date) {
							return (
								<div key={cfg.config_key}>
									<Link to={`/admin/users/${key}/${cfg.config_key}`}>
										{' '}
										{cfg.config_name}{' '}
									</Link>{' '}
									- Subscription ID : {cfg.subscr[0].subscr_id} - Active
									Proxies: <b>{cfg.configProxy.length}</b>
								</div>
							);
						} else {
							return null;
						}
					})}
				</div>
				<h3>Expired subscriptions:</h3>
				<div>
					{data.member.config.map((cfg) => {
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
		</React.Fragment>
	);
};

export default UserEdit;
