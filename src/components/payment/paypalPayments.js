import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
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

	if (totalPrice !== 0) {
		return (
			<PayPalButton
				amount={Math.round(totalPrice * 100) / 100}
				shippingPreference='NO_SHIPPING'
				options={{
					clientId:
						'AaYxV5drvEbvKKiwrz0Fmd8IPQKxHb8tPaWcu1B1EewkZwG38EhQ29e4jawlq-PJyQLyIi_VPYmnV7vg',
					disableFunding: 'card',
				}}
				style={{
					color: 'blue',
					shape: 'pill',
					label: 'buynow',
				}}
				onSuccess={(details, data) => {
					console.log(details);
					console.log(data);
					setCart([]);
					window.localStorage.removeItem('lsCart');
					console.log(product);
					addPayment({
						variables: {
							object: product,
						},
					});
					navigate('/success');

					// OPTIONAL: Call your server to save the transaction

					return fetch('/paypal-transaction-complete', {
						method: 'post',
						body: JSON.stringify({
							orderID: data.orderID,
						}),
					});
				}}
			/>
		);
	}
	return null;
};
