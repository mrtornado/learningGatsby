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
import SelectConfigOptions from '../components/payment/selectConfigOptions';
import Button from '@material-ui/core/Button';
import { flatten } from '../utils/arrays';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '30ch',
		},
		'& .MuiSnackbarContent-root': {
			background: '#d22e2e',
		},
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.primary,
	},
}));

const period = [
	{
		value: '32',
		label: '1 Month',
	},
	{
		value: '93',
		label: '3 Months / 10% Discount',
	},
	{
		value: '184',
		label: '6 Months / 20% Discount',
	},
	{
		value: '368',
		label: '12 Months / 30% Discount',
	},
];

const Checkout = ({ location }, props) => {
	const loginUser = isLoggedIn();
	const { cartState, totalPriceState, productState } = useContext(CartContext);
	const [cart] = cartState;
	const [totalPrice, setTotalPrice] = totalPriceState;
	const [product, setProduct] = productState;
	const [currency, setCurrency] = React.useState(''); // event.targe.value & days also
	const [submit, setSubmit] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const classes = useStyles();

	React.useEffect(() => {
		setProduct(flattenProduct);
	}, [currency]);

	React.useEffect(() => {
		setTotalPrice(xPrice);
	}, [xPrice, setTotalPrice]);

	React.useEffect(() => {
		setProduct(
			cart.map((x) => {
				const prod = {
					title: x.title,
					proxy_count: x.proxy_count,
					port: Math.floor(Math.random() * 53000) + 10000,
				};

				if (x.quantity > 1) {
					const more = Array.from({ length: x.quantity }, (y) => {
						const prods = {
							title: x.title,
							proxy_count: x.proxy_count,
							port: Math.floor(Math.random() * 53000) + 10000,
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

	const xPrice = cart.reduce((acc, x) => {
		const price = x.quantity * x.price;
		return acc + price;
	}, 0);

	const handleChange = (event) => {
		setCurrency(event.target.value);
		if (event.target.value === '32') {
			setTotalPrice(xPrice);
			let newArr = flattenProduct.map((x) => ({ ...x, interval: 32 }));
			setProduct(newArr);
		}
		if (event.target.value === '93') {
			const yPrice = xPrice - (xPrice * 10) / 100;
			setTotalPrice(yPrice * 3);
			let newArr = flattenProduct.map((x) => ({ ...x, interval: 93 }));
			setProduct(newArr);
		}
		if (event.target.value === '184') {
			const yPrice = xPrice - (xPrice * 20) / 100;
			setTotalPrice(yPrice * 6);
			let newArr = flattenProduct.map((x) => ({ ...x, interval: 184 }));
			setProduct(newArr);
		}
		if (event.target.value === '368') {
			const yPrice = xPrice - (xPrice * 30) / 100;
			setTotalPrice(yPrice * 12);
			let newArr = flattenProduct.map((x) => ({ ...x, interval: 368 }));
			setProduct(newArr);
		}
	};

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

	const handleClick = async (e) => {
		const ooo = product.map((x) => {
			if (
				x.proxy_type &&
				x.proxy_auth_type &&
				x.location_key.indexOf(0) !== 0
			) {
				return setSubmit(true);
			}
			setSubmit(false);
			setOpen(true);
		});

		return ooo;
	};

	let render;
	if (currency !== '') {
		render = product.map((x, index) => {
			return <SelectConfigOptions key={index} title={x.title} i={index} />;
		});
	}

	if (submit) {
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
							{period.map((option) => (
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
							<Snackbar
								className={classes.root}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								open={open}
								onClose={() => setOpen(false)}
								autoHideDuration={5000}
								message={'You have to select all options'}
							/>
						</div>
					) : null}
				</div>
			</React.Fragment>
		);
	}
	return <Login location={location} />;
};

export default Checkout;
