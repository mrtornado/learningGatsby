import React, { useContext } from 'react';
import { CartContext } from '../components/store/cartContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'gatsby';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

const Cart = ({ location }) => {
	const { cartState, totalPriceState, productState } = useContext(CartContext);
	const [cart, setCart] = cartState;
	const [totalPrice, setTotalPrice] = totalPriceState;
	const [product, setProduct] = productState;

	React.useEffect(() => {
		setTotalPrice(xPrice);
	});

	const xPrice = cart.reduce((acc, x) => {
		const price = x.quantity * x.price;
		return acc + price;
	}, 0);

	const totalItems = cart.reduce((acc, x) => acc + x.quantity, 0);

	const addItem = (id) => {
		setCart((prevCart) =>
			cart.map((x) => {
				if (x.id !== id) return x;
				const itemIndex = prevCart.findIndex((x) => x.id === id);
				return { ...x, quantity: prevCart[itemIndex].quantity + 1 };
			})
		);
	};

	const substractItem = (id) => {
		setCart((prevCart) =>
			cart.map((x) => {
				if (x.id === id && x.quantity === 1) return setCart(prevCart);
				if (x.id !== id) return x;
				const itemIndex = prevCart.findIndex((x) => x.id === id);
				return { ...x, quantity: prevCart[itemIndex].quantity - 1 };
			})
		);
	};

	const deleteItem = (id) => {
		setCart((list) => list.filter((x) => x.id !== id));
		setProduct((list) => list.filter((x) => x.id !== id));
		window.localStorage.removeItem('t');
		window.localStorage.removeItem('prod');
	};

	const classes = useStyles();
	const products = cart.map((x) => {
		const price = x.price * x.quantity;

		return (
			<div key={x.id} className={classes.root}>
				<Grid container spacing={0}>
					<Grid item xs={4}>
						<Paper square elevation={0} className={classes.paper}>
							{x.title}
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper square elevation={0} className={classes.paper}>
							<button onClick={() => substractItem(x.id)}>-</button>{' '}
							{x.quantity} <button onClick={() => addItem(x.id)}>+</button>
							<span>
								<button onClick={() => deleteItem(x.id)}>X</button>
							</span>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper square elevation={0} className={classes.paper}>
							${Math.round(price * 100) / 100}
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	});

	const Checkout = () => {
		if (cart.price !== 0) {
			return (
				<Link to={`/checkout/`} state={{ checkout: location }}>
					<Button variant='text' color='primary'>
						Checkout
					</Button>
				</Link>
			);
		}
		return null;
	};

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<Paper className={classes.paper}>Product</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.paper}>Quantity</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.paper}>Price</Paper>
				</Grid>
			</Grid>
			<span>{products}</span>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<Paper elevation={0} className={classes.paper}></Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper elevation={0} className={classes.paper}>
						Total items: {totalItems}
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper elevation={0} className={classes.paper}>
						{' '}
						Total Price: <b>${Math.round(totalPrice * 100) / 100} </b>
						<br />
						<Checkout />
					</Paper>
				</Grid>
			</Grid>
			<span></span>
			<br />
			<span></span>
			<div></div>
		</div>
	);
};

export default Cart;
