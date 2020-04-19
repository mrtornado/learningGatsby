import React, { useState } from 'react';
import { SEARCH } from '../../utils/graphql/adminGraph';
import { useQuery } from '@apollo/react-hooks';
import Select from 'react-select';
import _ from 'lodash';
import { navigate } from 'gatsby';

export default function Search() {
	const [openMenu, setOpenMenu] = useState(false);

	const { loading, error, data } = useQuery(SEARCH, {
		variables: { language: 'english' },
	});

	// function customTheme(theme) {
	// 	return {
	// 		...theme,
	// 		colors: {
	// 			...theme.colors,
	// 			primary25: 'orange',
	// 			primary: 'blue',
	// 		},
	// 	};
	// }

	if (loading) return <p>Loading ...</p>;
	if (error) return `Error! ${error.message}`;

	const users = data.members.map((x) => x.username);
	const id = data.members.map((x) => x.member_key);

	// ARRAY MANIPULATION

	// const ip = data.members.map((x) =>
	// 	x.config.map((x) => x.configProxy.map((x) => x.ip_key.ip_address))
	// );

	// const ips = flatten(ip);

	// function flatten(array) {
	// 	if (array.length == 0) return array;
	// 	else if (Array.isArray(array[0]))
	// 		return flatten(array[0]).concat(flatten(array.slice(1)));
	// 	else return [array[0]].concat(flatten(array.slice(1)));
	// }

	const values = id.map((x) => ({ value: x }));
	const label = users.map((x) => ({ label: x }));

	const mergeData = _.merge([], values, label);

	// const fakeUsers = [
	// 	{ value: '1', label: 'alex', ip: ['192.168.1.1', '10.10.10.10'] },
	// 	{ value: '2', label: 'oana', ip: 'time' },
	// 	{ value: '3', label: 'mario' },
	// 	{ value: '4', label: 'carlos' },
	// ];

	const handleInputChange = (query, { action }) => {
		if (action === 'input-change') {
			setOpenMenu(true);
		}
	};

	const handleChange = (e) => {
		return navigate(`/admin/users/${e.value}`);
	};

	const hideMenu = () => {
		setOpenMenu(false);
	};

	// You can use getOptionLabel and getOptionValue to change value and label
	// getOptionLabel ={(option)=>option.users}
	// getOptionValue ={(option)=>option.id}
	const filterOptions = (item, search) => {
		return (
			// (item.data.ip && item.data.ip.toLocaleLowerCase().indexOf(search) > -1) ||
			(item.label && item.label.toLocaleLowerCase().indexOf(search) > -1) ||
			(item.value && item.value.toLocaleLowerCase().indexOf(search) > -1)
		);
	};

	return (
		<React.Fragment>
			<Select
				options={mergeData}
				// filterOption={createFilter({ ignoreAccents: false })} // this makes all the difference! when typing
				onInputChange={handleInputChange}
				simpleValue={false}
				onChange={handleChange}
				// onBlur={hideMenu}
				// menuIsOpen={openMenu}
				filterOption={filterOptions}
				// theme={customTheme}
				placeholder='search users, ips or configs'
				isSearchable
			/>
		</React.Fragment>
	);
}
