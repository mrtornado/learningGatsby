import gql from 'graphql-tag';

export const REGISTER_USER = gql`
	mutation register(
		$contact_name: String!
		$email_address: String!
		$username: String!
		$password: String!
	) {
		register(
			contact_name: $contact_name
			email_address: $email_address
			username: $username
			password: $password
		) {
			username
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
		}
	}
`;

export const ME = gql`
	query configsUser {
		me {
			username
		}
	}
`;

export const CONFIGS_USER = gql`
	query configsUser {
		me {
			username
			config {
				config_name
				config_key
				configProxy {
					proxy_key
					ip_key {
						ip_address
					}
				}
				subscr {
					subscr_id
					subscr_key
					cost_amount
					subscrTxn {
						txn_type
						start_time
						end_time
					}
				}
			}
		}
	}
`;

export const CONFIG_USER = gql`
	query Proxies($config_key: Int!) {
		config(config_key: $config_key) {
			config_name
			proxy_port
			configProxy {
				proxy_key
				ip_key {
					ip_address
				}
			}
		}
	}
`;

export const ADD_CONFIG_USER = gql`
	mutation addConfigUser($object: [object]!) {
		addConfigUser(object: $object) {
			config_name
		}
	}
`;
