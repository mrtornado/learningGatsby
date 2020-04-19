import React, { useContext } from 'react';
import {
	dedicatedLocations,
	businessLocations,
} from '../../utils/data/locations';
import Select from 'react-select';
import styled from 'styled-components';
import { CartContext } from '../store/cartContext';
import UserDropDownContainer from '../users/userDropDownContainer';

const SelectConfigOptions = ({ title, i }) => {
	const { productState } = useContext(CartContext);
	const [product, setProduct] = productState;
	const [show, setShow] = React.useState(false);
	const [error, setError] = React.useState(true);

	React.useEffect(() => {}, [show]);

	const reactSelectTheme = (error) => (theme) => {
		const errorStyling = error
			? {
					primary: 'red',
					neutral10: 'red',
					neutral30: 'red',
					neutral20: 'red',
					neutral60: 'red',
			  }
			: {};

		return {
			...theme,
			colors: {
				...theme.colors,
				...errorStyling,
			},
		};
	};

	const customStyles = {
		container: (base) => ({
			...base,
			width: 300,
			flex: 1,
		}),
		// control: (styles) => ({
		// 	...styles,
		// 	borderColor: show === false ? 'red' : styles.borderColor,
		// }),
	};

	const handleBlur = () => {
		setShow(true);
	};

	const handleChangeProxyType = (e, i) => {
		let newArr = product;
		newArr[i] = { ...product[i], proxy_type: e.value };
		setProduct(newArr);
		setError(false);
	};

	const handleChangeAuth = (e, i) => {
		let newArr = product;
		newArr[i] = { ...product[i], proxy_auth_type: e.value };
		setProduct(newArr);
		setError(false);
	};

	const handleChangeLocations = (currentNode, selectedNodes) => {
		const loc = selectedNodes.map((x) => x.value).join(',').split`,`.map(
			(x) => +x
		);

		let newArr = product;
		newArr[i] = { ...product[i], location_key: loc };
		setProduct(newArr);
	};

	return (
		<React.Fragment>
			<link
				href='https://unpkg.com/react-dropdown-tree-select/dist/styles.css'
				rel='stylesheet'
			/>
			<div>
				<h4> {title} </h4>
			</div>
			<DropdownStyled>
				<UserDropDownContainer
					data={
						title.includes('Dedicated') ? dedicatedLocations : businessLocations
					}
					onChange={handleChangeLocations}
					onBlur={handleBlur}
				/>
			</DropdownStyled>

			{show && (
				<React.Fragment>
					<Select
						options={[
							{ value: 'http', label: 'HTTPS' },
							{ value: 'socks5', label: 'SOCKS5' },
						]}
						placeholder='Select Proxy Format'
						simpleValue={false}
						onChange={(e) => handleChangeProxyType(e, i)}
						theme={reactSelectTheme(error)}
						styles={customStyles}
						isSearchable={false}
					/>
					<Select
						options={[
							{ value: 'strong', label: 'username and password' },
							{ value: 'iponly', label: 'ip authentification' },
						]}
						placeholder='Select Proxy Authentication'
						theme={reactSelectTheme(error)}
						simpleValue={false}
						onChange={(e) => handleChangeAuth(e, i)}
						styles={customStyles}
						isSearchable={false}
					/>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

const DropdownStyled = styled.div`
	width: 300px;
	/* display: flex; */
	margin-top: 20px;
`;

export default SelectConfigOptions;
