import React from 'react';
import OneTimePaymentModal from './OneTimePaymentModal';
import SubscriptionPaymentModal from './SubscriptionPaymentModal';

const PaymentMethod = () => {
	return (
		<div>
			<div>Choose how you want to pay: </div>
			<OneTimePaymentModal /> <br />
			<SubscriptionPaymentModal />
		</div>
	);
};

export default PaymentMethod;
