import React, { useContext } from 'react';
import { CartContext } from '../store/cartContext';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { ShowPaypalOneTimePayment } from './paypalPayments';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import CryptoJS from 'crypto-js';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function OneTimePaymentModal() {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const { totalPriceState, productState } = useContext(CartContext);
	const [totalPrice] = totalPriceState;
	const [product] = productState;
	const [open, setOpen] = React.useState(false);

	const price = CryptoJS.AES.encrypt(
		JSON.stringify(totalPrice),
		'worldWide9900zz'
	).toString();

	const prod = CryptoJS.AES.encrypt(
		JSON.stringify(product),
		'worldWide9900zz'
	).toString();

	const handleOpen = () => {
		setOpen(true);
		window.localStorage.setItem('t', price);
		window.localStorage.setItem('prod', prod);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleBitcoin = () => {
		navigate('/bitcoinPayment');
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id='simple-modal-title'>
				One time payment of ${Math.round(totalPrice * 100) / 100}
			</h2>
			<div id='simple-modal-description'>
				Choose your favorite payment method
			</div>
			<ButtonContainer>
				<Button fullWidth variant='text' onClick={handleOpen}>
					<ShowPaypalOneTimePayment handleClose={handleClose} />
				</Button>
			</ButtonContainer>
			<ButtonContainer>
				<br />
				<Button
					fullWidth
					variant='contained'
					color='secondary'
					onClick={handleBitcoin}
				>
					Bitcoin
				</Button>
			</ButtonContainer>
			<h5>
				Don't close this page, it will close automatically when payment is
				completed!
			</h5>
		</div>
	);

	return (
		<div>
			<div>
				<Button variant='contained' color='primary' onClick={handleOpen}>
					One Time Payment
				</Button>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
			>
				{body}
			</Modal>
		</div>
	);
}

const ButtonContainer = styled.div`
	width: 240px;
`;

export default OneTimePaymentModal;
