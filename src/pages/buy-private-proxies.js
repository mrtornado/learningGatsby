import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Link from '../components/material/Link';
import { useContext } from 'react';
import { CartContext } from '../components/store/cartContext';

const getProducts = graphql`
	{
		allMysqlProxyPlans {
			edges {
				node {
					id
					proxy_count
					mysqlId
					title
					price
					description
					item_id
					enabled
				}
			}
		}
	}
`;

const BuyProxies = () => {
	const { cartState } = useContext(CartContext);
	// eslint-disable-next-line
	const [cart, setCart] = cartState;

	// React.useEffect = () => {
	// 	window.localStorage.setItem('lsCart', JSON.stringify(cart));
	// };

	// React.useEffect(() => {
	// 	const localCart = window.localStorage.getItem('lsCart');
	// 	if (localCart) {
	// 		setCart(JSON.parse(localCart));
	// 	}
	// }, [addtoCart]);

	const addToCart = (price, title, id, quantity, proxy_count) => {
		const product = {
			proxy_count,
			price,
			title,
			id,
			quantity,
		};
		if (cart.length > 0) {
			//cart not empty
			let cartIndex = cart.findIndex((x) => x.id === id);
			// if returns -1 there are no items with same id
			if (cartIndex === -1) {
				setCart((x) => [...x, product]);
			} else {
				// we need to update quanity

				setCart((prevCart) =>
					cart.map((x) => {
						if (x.id !== id) return x;
						const itemIndex = prevCart.findIndex((x) => x.id === id);
						return { ...x, quantity: prevCart[itemIndex].quantity + 1 };
					})
				);
			}
		} else {
			//Cart is empty
			setCart([product]);
		}
	};

	return (
		<StaticQuery
			query={getProducts}
			render={(data) => (
				<React.Fragment>
					<h1>Buy Private Proxies</h1>
					<ul>
						{data.allMysqlProxyPlans.edges.map((document) => (
							<li key={document.node.id}>
								<h2>
									<Link to={`/buy-private-proxies/${document.node.item_id}`}>
										{document.node.title}
									</Link>
									<p>Price: ${document.node.price}</p>
									<button
										onClick={() =>
											addToCart(
												document.node.price,
												document.node.title,
												document.node.mysqlId,
												document.node.enabled,
												document.node.proxy_count
											)
										}
									>
										Add to cart
									</button>
								</h2>
								<p>{document.node.item_id}</p>
							</li>
						))}
					</ul>
				</React.Fragment>
			)}
		/>
	);
};

export default BuyProxies;
