import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Link from '../components/material/Link';

const getArticles = graphql`
	{
		allBlogResults {
			edges {
				node {
					id
					title
					teaser
					alias
				}
			}
		}
	}
`;

const Blog = () => {
	return (
		<StaticQuery
			query={getArticles}
			render={(data) => (
				<React.Fragment>
					<h1>YPP Blog Page</h1>
					<ul>
						{data.allBlogResults.edges.map((document) => (
							<li key={document.node.id}>
								<h2>
									<Link to={`/blog/${document.node.alias}`}>
										{document.node.title}
									</Link>
								</h2>
								<p>{document.node.teaser}</p>
							</li>
						))}
					</ul>
				</React.Fragment>
			)}
		/>
	);
};

export default Blog;
