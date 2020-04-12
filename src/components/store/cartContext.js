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
	const [totalPrice, setTotalPrice] = React.useState();

	return (
		<CartContext.Provider
			value={{
				cartState: [cart, setCart],
				totalPriceState: [totalPrice, setTotalPrice],
			}}
		>
			{props.children}
		</CartContext.Provider>
	);
};
