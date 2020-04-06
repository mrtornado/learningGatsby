import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Link from '../components/material/Link';
import Cart from './cart';
import { useContext } from 'react';
import { CartContext } from '../components/store/cartContext';

const getProducts = graphql`
	{
		allMysqlProxyPlans {
			edges {
				node {
					id
					mysqlId
					title
					price
					description
					item_id
				}
			}
		}
	}
`;

const BuyProxies = () => {
	const { cartState } = useContext(CartContext);
	const [cart, setCart] = cartState;

	const addToCart = (price, title, id) => {
		const product = {
			price,
			title,
			id,
		};

		setCart((currentCart) => [...currentCart, product]);
	};

	return (
		<StaticQuery
			query={getProducts}
			render={(data) => (
				<React.Fragment>
					<Cart />
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
												document.node.mysqlId
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
