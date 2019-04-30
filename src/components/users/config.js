import React from 'react';
import { Query } from 'react-apollo';
import { CONFIG_USER } from '../../utils/graphql/userGraph';

export default function Config(props) {
	const key = parseInt(props.id);

	return (
		<Query query={CONFIG_USER} variables={{ config_key: key }}>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading ...</p>;
				if (error) return `Error! ${error}`;

				return (
					<React.Fragment>
						{data.config.configProxy.map((x) => (
							<div key={x.proxy_key}>{x.ip_key.ip_address}</div>
						))}
					</React.Fragment>
				);
			}}
		</Query>
	);
}
