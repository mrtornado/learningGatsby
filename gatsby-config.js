module.exports = {
	plugins: [
		'gatsby-plugin-top-layout',
		{
			resolve: 'gatsby-plugin-material-ui',
			// If you want to use styled components you should change the injection order.
			options: {
				stylesProvider: {
					injectFirst: true,
				},
			},
		},
		// If you want to use styled components you should add the plugin here.
		'gatsby-plugin-styled-components',
		'gatsby-plugin-react-helmet',
		`gatsby-plugin-layout`,
		{
			resolve: `gatsby-plugin-create-client-paths`,
			options: { prefixes: [`/users/*`] },
		},
		{
			resolve: `gatsby-source-mysql`,
			options: {
				connectionDetails: {
					host: '176.9.56.22',
					user: 'c0yppusr',
					password: '123456789ypp#',
					database: 'testypp',
				},
				queries: [
					{
						statement: 'SELECT * FROM blog',
						idFieldName: 'id',
						name: 'Blog',
					},
					{
						statement: 'SELECT * FROM proxy_plans',
						idFieldName: 'id',
						name: 'ProxyPlans',
					},
				],
			},
		},
	],
	siteMetadata: {
		title: 'Your Private Proxy',
	},
};
