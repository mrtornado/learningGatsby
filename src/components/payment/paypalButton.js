import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const PaypalButton = (props) => {
	const [sdkReady, setSdkReady] = useState(false);

	const addPaypalSdk = () => {
		const clientID =
			'AaYxV5drvEbvKKiwrz0Fmd8IPQKxHb8tPaWcu1B1EewkZwG38EhQ29e4jawlq-PJyQLyIi_VPYmnV7vg';
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&disable-funding=card`;
		script.async = true;
		script.onload = () => {
			setSdkReady(true);
		};
		script.onerror = () => {
			alert('Please place your api key in button.js to load paypal button');
			throw new Error('Paypal SDK could not be loaded.');
		};

		document.body.appendChild(script);
	};

	useEffect(() => {
		if (window !== undefined && window.paypal === undefined) {
			addPaypalSdk();
		} else if (
			window !== undefined &&
			window.paypal !== undefined &&
			props.onButtonReady
		) {
			props.onButtonReady();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createOrder = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: props.amount,
					},
				},
			],
			application_context: {
				shipping_preference: 'NO_SHIPPING',
			},
		});
	};

	const onApprove = (data, actions) => {
		// console.log(data);
		return actions.order
			.capture()
			.then((details) => {
				if (props.onSuccess) {
					return props.onSuccess(data, details);
				}
			})
			.catch((err) => {
				alert(err);
			});
	};

	if (!sdkReady && window.paypal === undefined) {
		return <h5>Loading PayPal Button...</h5>;
	}

	const Button = window.paypal.Buttons.driver('react', {
		React,
		ReactDOM,
	});

	return (
		<Button
			{...props}
			createOrder={(data, actions) => createOrder(data, actions)}
			onApprove={(data, actions) => onApprove(data, actions)}
			style={{
				layout: 'vertical',
				color: 'blue',
				shape: 'rect',
				label: 'paypal',
			}}
		/>
	);
};

export default PaypalButton;
