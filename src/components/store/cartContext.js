import React from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
	const [cart, setCart] = React.useState([]);
	const [totalPrice, setTotalPrice] = React.useState();
	const [product, setProduct] = React.useState([
		// {
		// 	member_key: null,
		// 	proxy_auth_type: null,
		// 	interval_count: null,
		// 	proxy_type: null,
		// 	proxy_port: null,
		// },
	]);

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
