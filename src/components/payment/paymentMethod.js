import React from 'react';
import SimpleModal from '../material/simpleModal';
import AnimatedModal from '../material/animatedModal';

function PaymentMethod() {
	const xcart = localStorage.getItem('lsCart');
	const cart = JSON.parse(xcart);

	if (cart) {
	}
	const totalPrice = cart.reduce((acc, x) => {
		const price = x.quantity * x.price;
		return acc + price;
	}, 0);

	return (
		<div>
			<div>Hello from payment method</div>
			<div>You have to pay ${Math.round(totalPrice * 100) / 100}</div>
			<SimpleModal /> <br />
			<AnimatedModal />
		</div>
	);
}

export default PaymentMethod;
