import React, {
	useState,
	useCallback,
	useMemo,
	useEffect,
	useContext,
} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import axios from 'axios';
import { CartContext } from '../store/cartContext';
import CryptoJS from 'crypto-js';
import QRCode from 'qrcode.react';
import { navigate } from 'gatsby';
import { ADD_CONFIG_USER } from '../../utils/graphql/userGraph';
import { useMutation } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 500,
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
	},
}));

const BtcPayment = () => {
	const classes = useStyles();
	const [progress, setProgress] = React.useState(0);
	const { cartState } = useContext(CartContext);
	const t = window.localStorage.getItem('t');
	const bytes = CryptoJS.AES.decrypt(t, 'worldWide9900zz');
	const totalPrice = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	const prod = window.localStorage.getItem('prod');
	const bytess = CryptoJS.AES.decrypt(prod, 'worldWide9900zz');
	const product = JSON.parse(bytess.toString(CryptoJS.enc.Utf8));
	const [btcUsd, setBtcUsd] = React.useState();
	const [btcToUsd, setBtcToUsd] = React.useState();
	const [paymentComplete, setPaymentComplete] = React.useState(false);
	const paymentUsd = Math.round(btcToUsd * 100000) / 100000;
	const [socketUrl, setSocketUrl] = useState('wss://ws.blockchain.info/inv'); //Public API that will echo messages sent to it back to the client
	const [messageHistory, setMessageHistory] = useState([]);
	const [amount, setAmount] = useState();
	// eslint-ignore-next-line
	const [cart, setCart] = cartState;
	const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(
		socketUrl,
		STATIC_OPTIONS
	);
	const [addPayment, { data }] = useMutation(ADD_CONFIG_USER);
	const btcAddress = '1P7uabKG3Ar58rbUwbBQRwUGEgbWPKtyMQ';

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

	const STATIC_OPTIONS = useMemo(
		() => ({
			onOpen: () => console.log('opened'),
			shouldReconnect: (closeEvent) => true, //Will attempt to reconnect on all close events, such as server shutting down
		}),
		[]
	);

	useEffect(() => {
		if (lastMessage !== null) {
			//getWebSocket returns the WebSocket wrapped in a Proxy. This is to restrict actions like mutating a shared websocket, overwriting handlers, etc
			const currentWebsocketUrl = getWebSocket().url;
			console.log('received a message from ', currentWebsocketUrl);

			setMessageHistory((prev) => prev.concat(lastMessage));
		}
	}, [lastMessage]);

	useEffect(() => {
		if (paymentComplete !== false) {
			console.log('do i run ? ');
			setCart([]);
			window.localStorage.removeItem('lsCart');
			addPayment({
				variables: {
					object: product,
				},
			});
			navigate('/success');
		}
	}, [paymentComplete]);

	useEffect(() => {
		console.log('timeout');
		setTimeout(() => {
			sendMessage(JSON.stringify({ op: 'ping' }));
		}, 60000);
	});

	const go = JSON.stringify({
		op: 'addr_sub',
		addr: '1P7uabKG3Ar58rbUwbBQRwUGEgbWPKtyMQ',
	});

	React.useEffect(() => {
		setTimeout(() => {
			sendMessage(go);
			console.log('Waiting for Payments..');
		}, 10000);
	}, []);

	const handleClickSendMessage = useCallback(() => sendMessage(go), []);

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
	}[readyState];

	if (lastMessage) {
		const response = JSON.parse(lastMessage.data);

		if ('x' in response) {
			response.x.out.map((x) => {
				if (btcAddress === x.addr) {
					const value = x.value / 100000000;
					if (paymentComplete !== true && value === paymentUsd) {
						setPaymentComplete(true);
						setAmount(value);
					}
				}
			});
		}
	}

	if (!paymentUsd && t) {
		return <h2>Loading ...</h2>;
	}
	if (amount) {
		return <h2> Received {amount} BTC</h2>;
	}

	return (
		<div>
			<h4 style={{ color: 'green' }}>
				Connection to the Bitcoin servers is <span> {connectionStatus} </span>
			</h4>
			<div className={classes.root}>
				<Typography variant='h6' gutterBottom color='primary'>
					Awaiting Payment
				</Typography>
				<CircularProgress />
			</div>
			<QRCode size={150} value={`bitcoin:${btcAddress}?amount=${paymentUsd}`} />
			<br />
			<h5>1 BTC = ${btcUsd} USD</h5>
			<h5>Your total price is ${Math.round(totalPrice * 100) / 100} USD </h5>
			<h5>Bitcoin Address: {btcAddress}</h5>
			<h4>
				You have to send exactly: {paymentUsd} BTC or just use the QRCode to
				send the payment
			</h4>
			<div style={{ color: 'red' }}>
				If you send less then <b> {paymentUsd} BTC </b>, your payment won't be
				proccessed.{' '}
			</div>
			{lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
			<br />
			<button
				onClick={handleClickSendMessage}
				disabled={readyState !== ReadyState.OPEN}
			>
				I have sent the payment!
			</button>
		</div>
	);
};

export default BtcPayment;
