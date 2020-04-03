import { graphql } from 'gatsby';
import React from 'react';
import showdown from 'showdown';

const converter = new showdown.Converter();

export default function ArticleTemplate({ data }) {
	return (
		<div>
			<h2>{data.mysqlBlog.title}</h2>
			<div
				dangerouslySetInnerHTML={{
					__html: converter.makeHtml(data.mysqlBlog.description)
				}}
			/>
		</div>
	);
}

export const getArticle = graphql`
	query ArticleTemplate($id: String!) {
		mysqlBlog(id: { eq: $id }) {
			title
			description
			id
		}
	}
`;
