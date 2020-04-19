import React, { useContext } from 'react';
import PayPalButton from './paypalButton';
import { CartContext } from '../store/cartContext';
import { navigate } from 'gatsby';
import { ADD_CONFIG_USER } from '../../utils/graphql/userGraph';
import { useMutation } from 'react-apollo';

export const ShowPaypalOneTimePayment = () => {
	const { cartState, totalPriceState, productState } = useContext(CartContext);
	// eslint-ignore-next-line
	const [cart, setCart] = cartState;
	const [totalPrice] = totalPriceState;
	const [product] = productState;
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
