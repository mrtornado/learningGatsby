import React, { useState } from 'react';

export const CartContext = React.createContext();

// const initialCartState = {
// 	id: '',
// 	title: '',
// 	description: '',
// 	inBasket: false,
// 	price: '',
// 	link: '',
// };

export const CartProvider = (props) => {
	const [cart, setCart] = useState([]);
	const [inCart, setInCart] = useState(false);

	return (
		<CartContext.Provider
			value={{ cartState: [cart, setCart], inCartState: [inCart, setInCart] }}
		>
			{props.children}
		</CartContext.Provider>
	);
};
