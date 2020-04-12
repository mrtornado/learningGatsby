import React, { useContext } from 'react';
import Login from '../components/users/login';
import PaymentMethod from '../components/payment/paymentMethod';
import { isLoggedIn } from '../utils/auth';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { CartContext } from '../components/store/cartContext';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '30ch',
		},
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

const period = [
	{
		value: '1',
		label: '1 Month',
	},
	{
		value: '3',
		label: '3 Months / 10% Discount',
	},
	{
		value: '6',
		label: '6 Months / 20% Discount',
	},
	{
		value: '12',
		label: '12 Months / 30% Discount',
	},
];

const Checkout = ({ location }) => {
	const loginUser = isLoggedIn();
	const { cartState, totalPriceState } = useContext(CartContext);

	// eslint-ignore-next-line
	const [cart, setCart] = cartState;
	const [totalPrice, setTotalPrice] = totalPriceState;

	const [currency, setCurrency] = React.useState('');

	const handleChange = (event) => {
		setCurrency(event.target.value);
		if (event.target.value === '1') {
			setTotalPrice(xPrice);
		}
		if (event.target.value === '3') {
			const yPrice = xPrice - (xPrice * 10) / 100;
			setTotalPrice(yPrice * 3);
		}
		if (event.target.value === '6') {
			const yPrice = xPrice - (xPrice * 20) / 100;
			setTotalPrice(yPrice * 6);
		}
		if (event.target.value === '12') {
			const yPrice = xPrice - (xPrice * 30) / 100;
			setTotalPrice(yPrice * 12);
		}
	};

	const classes = useStyles();

	const xPrice = cart.reduce((acc, x) => {
		const price = x.quantity * x.price;
		return acc + price;
	}, 0);

	React.useEffect(() => {
		setTotalPrice(xPrice);
	}, [xPrice, setTotalPrice]);

	const totalItems = cart.reduce((acc, x) => acc + x.quantity, 0);

	const products = cart.map((x) => {
		const price = x.price * x.quantity;

		return (
			<div key={x.id} className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs={3}>
						<Paper square elevation={0} className={classes.paper}>
							{x.title}
						</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper square elevation={0} className={classes.paper}>
							{x.quantity}
						</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper square elevation={0} className={classes.paper}>
							${Math.round(price * 100) / 100}
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	});

	if (loginUser) {
		return totalPrice !== 0 ? (
			<React.Fragment>
				<Grid container spacing={3}>
					<Grid item xs={3}>
						<Paper className={classes.paper}>Product</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper className={classes.paper}>Quantity</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper className={classes.paper}>Price</Paper>
					</Grid>
				</Grid>
				<span>{products}</span>
				<Grid container spacing={3}>
					<Grid item xs={3}>
						<Paper elevation={0} className={classes.paper}></Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper elevation={0} className={classes.paper}>
							Total items: {totalItems}
						</Paper>
					</Grid>
					<Grid item xs={3}>
						<Paper elevation={0} className={classes.paper}>
							{' '}
							Total Price: <b>${Math.round(totalPrice * 100) / 100} </b>
							<br />
						</Paper>
					</Grid>
				</Grid>

				<form className={classes.root} noValidate autoComplete='off'>
					<div>
						<TextField
							id='standard-select-currency'
							select
							label='Select'
							value={currency}
							onChange={handleChange}
							helperText='Select on what period you want to pay'
						>
							{period.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</div>
				</form>

				{currency && totalPrice !== 0 ? (
					<PaymentMethod />
				) : (
					<h2>Get great discounts when paying for more then just 1 month ! </h2>
				)}
			</React.Fragment>
		) : (
			<h2>Make sure you have items in your cart before moving forward !</h2>
		);
	}

	return <Login location={location} />;
};

export default Checkout;
