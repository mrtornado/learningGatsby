import gql from 'graphql-tag';

export const SEARCH = gql`
	query {
		members {
			username
			config {
				config_key
				config_name
				configProxy {
					ip_key {
						ip_address
					}
				}
			}
			member_key
		}
	}
`;

export const USER_EDIT = gql`
	query userEdit($member_key: Int!) {
		member(member_key: $member_key) {
			username
			member_key
			config {
				config_name
				config_key
				configProxy {
					ip_key {
						ip_address
					}
				}
				subscr {
					subscrTxn {
						txn_type
						end_time
					}
					subscr_id
					subscr_key
					cost_amount
				}
			}
		}
	}
`;

export const ADD_CONFIG = gql`
	mutation addConfig($userId: Int!, $proxy_count: Int!, $locations: String!) {
		addConfig(
			userId: $userId
			subscr: { proxy_count: $proxy_count }
			locations: $locations
		) {
			config_name
		}
	}
`;
