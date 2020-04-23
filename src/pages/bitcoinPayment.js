import React from 'react';
import { isLoggedIn } from '../utils/auth';
import Login from '../components/users/Login';
import BtcPayment from '../components/payment/BtcPayment';

const BitcoingPayment = ({ location }) => {
	const loginUser = isLoggedIn();

	const getCart = window.localStorage.getItem('lsCart');
	const cart = JSON.parse(getCart);

	if (loginUser && cart.length !== 0) {
		return (
			<div>
				<BtcPayment />
			</div>
		);
	}

	return (
		<div>
			<h3> You need items into your cart to access this page. </h3>
			<Login location={location} />
		</div>
	);
};

export default BitcoingPayment;
