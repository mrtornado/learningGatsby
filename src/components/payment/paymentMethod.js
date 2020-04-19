import React from 'react';
import OneTimePaymentModal from './oneTimePaymentModal';
import SubscriptionPaymentModal from './subscriptionPaymentModal';

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
