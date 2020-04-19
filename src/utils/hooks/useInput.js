import React from 'react';
import { CartContext } from '../../components/store/cartContext';

export function useInput() {
	const { productState } = React.useContext(CartContext);
	const [product, setProduct] = productState;

	const handleChangeProxyType = (e, i) => {
		let newArr = product;
		newArr[i] = { ...product[i], proxy_type: e.value };
		setProduct(newArr);
	};

	const handleChangeAuth = (e, i) => {
		let newArr = product;
		newArr[i] = { ...product[i], proxy_auth_type: e.value };
		setProduct(newArr);
	};

	return [handleChangeProxyType, handleChangeAuth];
}
