import React from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
	const [cart, setCart] = React.useState([]);
	const [totalPrice, setTotalPrice] = React.useState();
	const [product, setProduct] = React.useState([]);

	return (
		<CartContext.Provider
			value={{
				cartState: [cart, setCart],
				totalPriceState: [totalPrice, setTotalPrice],
				productState: [product, setProduct],
			}}
		>
			{props.children}
		</CartContext.Provider>
	);
};
