import React from 'react';
import Login from '../components/users/login';
import PaymentMethod from '../components/payment/paymentMethod';
import { isLoggedIn } from '../utils/auth';

const Checkout = ({ location }) => {
	const loginUser = isLoggedIn();

	if (loginUser) {
		return <PaymentMethod />;
	}

	return <Login location={location} />;
};

export default Checkout;
