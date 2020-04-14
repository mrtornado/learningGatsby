import React, { useContext, useReducer } from 'react';
import Login from '../components/users/login';
import PaymentMethod from '../components/payment/paymentMethod';
import { isLoggedIn } from '../utils/auth';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { CartContext } from '../components/store/cartContext';
import SelectConfigOptions from '../components/payment/selectConfigOptions';
import Button from '@material-ui/core/Button';
import { flatten } from '../utils/arrays';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '30ch'
		}
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.primary
	}
}));

const period = [
	{
		value: '32',
		label: '1 Month'
	},
	{
		value: '93',
		label: '3 Months / 10% Discount'
	},
	{
		value: '184',
		label: '6 Months / 20% Discount'
	},
	{
		value: '368',
		label: '12 Months / 30% Discount'
	}
];

const Checkout = ({ location }) => {
	const loginUser = isLoggedIn();
	const { cartState, totalPriceState, productState } = useContext(CartContext);
	//eslint-ignore-next-line
	const [cart, setCart] = cartState;
	const [totalPrice, setTotalPrice] = totalPriceState;
	const [product, setProduct] = productState;
	const [currency, setCurrency] = React.useState(''); // event.targe.value & days also
	const [submit, setSubmit] = React.useState();

	React.useEffect(() => {
		setProduct(flattenProduct);
	}, [totalPrice]);

	React.useEffect(() => {
		setTotalPrice(xPrice);
	}, [xPrice, setTotalPrice]);

	React.useEffect(() => {
		setProduct(
			cart.map(x => {
				const gen = Math.floor(Math.random() * 53000) + 10000;
				const prod = {
					id: Math.floor(Math.random() * 53000) + 10000,
					title: x.title,
					price: x.price,
					proxy_port: Math.floor(Math.random() * 53000) + 10000,
					proxy_auth_type: null
				};

				if (x.quantity > 1) {
					const more = Array.from({ length: x.quantity }, y => {
						const prods = {
							id: Math.floor(Math.random() * 53000) + 10000,
							title: x.title,
							price: x.price,
							proxy_port: gen,
							proxy_auth_type: null
						};
						return prods;
					});
					return more;
				}

				const delegate = Object.assign(prod);

				return delegate;
				// const all = Object.assign(more, delegate);
			})
		);
	}, []);

	const flattenProduct = flatten(product);

	const handleChange = event => {
		setCurrency(event.target.value);
		if (event.target.value === '32') {
			setTotalPrice(xPrice);
		}
		if (event.target.value === '93') {
			const yPrice = xPrice - (xPrice * 10) / 100;
			setTotalPrice(yPrice * 3);
		}
		if (event.target.value === '184') {
			const yPrice = xPrice - (xPrice * 20) / 100;
			setTotalPrice(yPrice * 6);
		}
		if (event.target.value === '368') {
			const yPrice = xPrice - (xPrice * 30) / 100;
			setTotalPrice(yPrice * 12);
		}
	};

	const classes = useStyles();

	const xPrice = cart.reduce((acc, x) => {
		const price = x.quantity * x.price;
		return acc + price;
	}, 0);

	const totalItems = cart.reduce((acc, x) => acc + x.quantity, 0);

	const products = cart.map(x => {
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

	const handleClick = async e => {
		// e.preventDefault();
		await setSubmit('none');
	};

	let render;

	if (currency !== '') {
		render = cart.map((x, index) => {
			if (x.quantity > 1) {
				return [...Array(x.quantity)].map((e, i) => (
					<SelectConfigOptions key={i} title={x.title} />
				));
			}
			return <SelectConfigOptions key={index} title={x.title} />;
		});
	}

	if (submit === 'none') {
		render = <PaymentMethod />;
	}

	if (loginUser) {
		return (
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
							label='Select Payment Period'
							value={currency}
							onChange={handleChange}
							helperText='Select on what period you want to pay'
						>
							{period.map(option => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</div>
				</form>

				<div>{render}</div>
				<div>
					{currency !== '' ? (
						<div>
							Please select your plan options before submitting
							<Button
								variant='contained'
								color='primary'
								value={'submit'}
								onClick={handleClick}
								style={{ display: submit ? 'none' : 'block' }}
							>
								{' '}
								Submit Changes
							</Button>
						</div>
					) : null}
				</div>
			</React.Fragment>
		);
	}
	return <Login location={location} />;
};

export default Checkout;
