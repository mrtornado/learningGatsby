/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require('gatsby-source-filesystem');
const path = require(`path`);

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const ProductTemplate = path.resolve('./src/templates/product.js');
const ArticleTemplate = path.resolve('./src/templates/article.js');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const result = await graphql(`
		{
			allBlogResults {
				edges {
					node {
						id
						alias
						title
					}
				}
			}
			allProxyPlansResults {
				edges {
					node {
						id
						item_id
					}
				}
			}
		}
	`);

	const products = result.data.allProxyPlansResults.edges;
	products.forEach(({ node: products }) => {
		createPage({
			path: `${products.item_id}`,
			component: ProductTemplate,
			context: { id: products.id }
		});
	});

	const articles = result.data.allBlogResults.edges;
	articles.forEach(({ node: articles }) => {
		createPage({
			path: `blog/${articles.alias}`,
			// Don't forget to add constant up for path
			component: ArticleTemplate,
			context: { id: articles.id }
		});
	});
};
