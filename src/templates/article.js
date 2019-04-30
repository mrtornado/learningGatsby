import { graphql } from 'gatsby';
import React from 'react';
import showdown from 'showdown';

const converter = new showdown.Converter();

export default function ArticleTemplate({ data }) {
	return (
		<div>
			<h2>{data.blogResults.title}</h2>
			<div
				dangerouslySetInnerHTML={{
					__html: converter.makeHtml(data.blogResults.description)
				}}
			/>
		</div>
	);
}

export const getArticle = graphql`
	query ArticleTemplate($id: String!) {
		blogResults(id: { eq: $id }) {
			title
			description
			id
		}
	}
`;
