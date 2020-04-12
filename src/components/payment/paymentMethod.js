import React from 'react';
import SimpleModal from '../material/simpleModal';
import AnimatedModal from '../material/animatedModal';

const PaymentMethod = () => {
	return (
		<div>
			<div>Choose how you want to pay: </div>
			<SimpleModal /> <br />
			<AnimatedModal />
		</div>
	);
};

export default PaymentMethod;
