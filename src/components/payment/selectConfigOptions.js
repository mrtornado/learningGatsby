import React, { useContext } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import { businessLocations } from '../../utils/data/locations';
import Select from 'react-select';
import styled from 'styled-components';
import { CartContext } from '../store/cartContext';

const SelectConfigOptions = ({ title }) => {
	const { cartState, totalPriceState, productState } = useContext(CartContext);
	const [product, setProduct] = productState;

	function customTheme(theme) {
		return {
			...theme,
			colors: {
				...theme.colors,
				primary25: 'orange',
				primary: 'blue'
			}
		};
	}

	const customStyles = {
		container: base => ({
			...base,
			width: 200,
			flex: 1,
			display: 'inline-block'
		})
	};

	const handleChangeLocations = e => {
		console.log(e);
		console.log('changed locations');
	};

	const handleChangeProxyType = () => {
		console.log('changed proxy type');
	};

	const handleChangeAuth = () => {
		console.log('change auth');
	};

	return (
		<React.Fragment>
			<link
				href='https://unpkg.com/react-dropdown-tree-select/dist/styles.css'
				rel='stylesheet'
			/>
			<div>{title}</div>
			<Select
				options={[
					{ value: 1, label: 'https' },
					{ value: 2, label: 'socks5' }
				]}
				placeholder='Select Proxy Format'
				simpleValue={false}
				onChange={handleChangeProxyType}
				theme={customTheme}
				styles={customStyles}
			/>
			<Select
				options={[
					{ value: 1, label: 'username and password' },
					{ value: 2, label: 'ip authentification' }
				]}
				placeholder='Select Proxy Authentication'
				simpleValue={false}
				onChange={handleChangeAuth}
				theme={customTheme}
				styles={customStyles}
			/>
			<Xxxx>
				<DropdownTreeSelect
					data={businessLocations}
					onChange={handleChangeLocations}
				/>
			</Xxxx>
		</React.Fragment>
	);
};

const Xxxx = styled.div`
	width: 300px;
	/* display: flex; */
	margin-top: 20px;
`;

export default SelectConfigOptions;

// <Xxxx>
// <DropdownTreeSelect
// 	data={trialLocations}
// 	onChange={handleChangeLocations}
// 	styles={customStyles}
// />;
// </Xxxx>
