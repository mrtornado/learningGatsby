import React, { useContext } from 'react';
import PayPalButton from './paypalButton';
import { CartContext } from '../store/cartContext';
import { navigate } from 'gatsby';
import { ADD_CONFIG_USER } from '../../utils/graphql/userGraph';
import { useMutation } from 'react-apollo';
import CryptoJS from 'crypto-js';

export const ShowPaypalOneTimePayment = () => {
	const { cartState } = useContext(CartContext);
	const t = window.localStorage.getItem('t');
	const bytes = CryptoJS.AES.decrypt(t, 'worldWide9900zz');
	const totalPrice = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

	const prod = window.localStorage.getItem('prod');
	const bytess = CryptoJS.AES.decrypt(prod, 'worldWide9900zz');
	const product = JSON.parse(bytess.toString(CryptoJS.enc.Utf8));
	// es-lint-ignore-next-line
	const [cart, setCart] = cartState;
	const [addPayment, { data }] = useMutation(ADD_CONFIG_USER);

	const onSuccess = (payment) => {
		// console.log(payment);
		setCart([]);
		window.localStorage.removeItem('lsCart');
		addPayment({
			variables: {
				object: product,
			},
		});
		navigate('/success');
	};

	const onCancel = (data) => {
		console.log(data);
	};

	const onError = (err) => {
		console.log(err);
	};

	return (
		<PayPalButton
			amount={Math.round(totalPrice * 100) / 100}
			onError={onError}
			onSuccess={onSuccess}
			onCancel={onCancel}
		/>
	);
};
