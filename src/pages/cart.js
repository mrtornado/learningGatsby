import React, { useContext } from 'react';
import { CartContext } from '../components/store/cartContext';

const Cart = () => {
	const [cart, setCart] = useContext(CartContext);
	const totalPrice = cart.reduce(
		(acc, currentCart) => acc + currentCart.price,
		0
	);

	const productName = cart.map((x) => x.title);

	return (
		<div>
			<span>items: {cart.length}</span>
			<br />
			<span>Product Name: {productName}</span>
			<br />
			<span>total price: ${Math.round(totalPrice * 100) / 100} </span>
		</div>
	);
};

export default Cart;
