import React from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import QRCode from 'qrcode.react';

const BitcoinPayment = () => {
	const ciphertext = window.localStorage.getItem('t');
	const bytes = CryptoJS.AES.decrypt(ciphertext, 'worldWide9900zz');
	const totalPrice = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	const [amount, setAmount] = React.useState();
	const [btcUsd, setBtcUsd] = React.useState();
	const [btcToUsd, setBtcToUsd] = React.useState();
	const btcAddress = '1LWUqoET5WyT9b2w32XnXaJ1HkFumdSL1P';

	const paymentUsd = Math.round(btcToUsd * 100000) / 100000;

	React.useEffect(() => {
		axios
			.get('https://blockchain.info/ticker')
			.then((res) => {
				setBtcUsd(res.data.USD.last);
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get(`https://blockchain.info/tobtc?currency=USD&value=${totalPrice}`)
			.then((res) => {
				setBtcToUsd(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	let btcs = new WebSocket('wss://ws.blockchain.info/inv');

	btcs.onopen = () => {
		btcs.send(
			JSON.stringify({
				op: 'addr_sub',
				addr: btcAddress,
				op: 'ping_tx',
			})
		);
		// btcs.send(JSON.stringify({ op: 'addr_unsub', addr: { btcAddress } }));  // to unsubscribe on payment received
		btcs.onmessage = (message) => {
			let response = JSON.parse(message.data);

			response.x.out.map((x) => {
				if (btcAddress === x.addr) {
					const value = x.value / 100000000;
					setAmount(value);
					return value;
				}

				return null;
			});
		};
	};

	if (!paymentUsd) {
		return <h2>Loading ...</h2>;
	}
	if (amount) {
		return <h2> Received {amount} BTC</h2>;
	}
	return (
		<div>
			<QRCode size={200} value={`bitcoin:${btcAddress}?amount=${paymentUsd}`} />
			<br />
			<h5>1 BTC = ${btcUsd} USD</h5>
			<h5>Your total price is ${totalPrice} USD </h5>
			<h4>You have to send: {paymentUsd} BTC</h4>
			<h5>Bitcoin Address: {btcAddress} </h5>
			<h4>Monitoring for payments! </h4>
		</div>
	);
};

export default BitcoinPayment;
