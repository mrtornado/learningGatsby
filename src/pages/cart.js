import React, { useContext } from 'react';
import { CartContext } from '../components/store/cartContext';

const Cart = () => {
	const { cartState } = useContext(CartContext);
	const [cart] = cartState;

	const totalPrice = cart.reduce(
		(acc, currentCart) => acc + currentCart.price,
		0
	);

	// Counting how many duplicate products we have and list only unique products
	const count = [
		...cart
			.reduce((mp, o) => {
				if (!mp.has(o.id)) mp.set(o.id, { ...o, count: 0 });
				mp.get(o.id).count++;
				return mp;
			}, new Map())
			.values(),
	];

	const products = count.map((x) => {
		const price = x.price * x.count;
		return (
			<p key={x.id}>
				{x.title} x {x.count} Price: <b>${price}</b>
			</p>
		);
	});

	// Listing only unique products
	// let products = [];
	// for (var i = 0, len = cart.length; i < len; i++) {
	// 	if (products.indexOf(cart[i].title) > -1) {
	// 	} else {
	// 		products.push(cart[i].title);
	// 	}
	// }
	// console.log(products);

	// const productName = [...new Set(cart)];

	// const productName = cart.map((x) => x.title);
	// console.log(productName);
	return (
		<div>
			<span>items: {cart.length}</span>
			<br />
			<span>{products}</span>
			<span>
				Total Price: <b>${Math.round(totalPrice * 100) / 100} </b>
			</span>
		</div>
	);
};

export default Cart;
