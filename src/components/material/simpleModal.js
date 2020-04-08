import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { ShowPaypalOneTimePayment } from '../payment/paypalPayments';
import styled from 'styled-components';

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

function PaymentMethod() {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const xcart = localStorage.getItem('lsCart');
	const cart = JSON.parse(xcart);

	const totalPrice = cart.reduce((acc, x) => {
		const price = x.quantity * x.price;
		return acc + price;
	}, 0);

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
					onClick={handleOpen}
				>
					Bitcoin
				</Button>
			</ButtonContainer>
		</div>
	);

	return (
		<div>
			<div>
				<Button variant='contained' color='primary' onClick={handleOpen}>
					Simple Modal One Time Payment
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

export default PaymentMethod;
