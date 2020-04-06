import { graphql } from 'gatsby';
import React from 'react';
import showdown from 'showdown';

const converter = new showdown.Converter();

export default function ProductTemplate({ data }) {
	const addToCart = () => {
		console.log('product page add to cart');
	};

	return (
		<div>
			<h2>{data.mysqlProxyPlans.title}</h2>
			<button onClick={addToCart}>Add To Cart</button>
			<p>Price: ${data.mysqlProxyPlans.price}</p>
			<div
				dangerouslySetInnerHTML={{
					__html: converter.makeHtml(data.mysqlProxyPlans.description),
				}}
			/>
		</div>
	);
}

export const getProduct = graphql`
	query ProductTemplate($id: String!) {
		mysqlProxyPlans(id: { eq: $id }) {
			title
			price
			description
			id
		}
	}
`;
