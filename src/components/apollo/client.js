import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import 'isomorphic-fetch';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	let token = localStorage.getItem('x-auth-token');
	// console.log(token);
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			'x-auth-token': token ? `${token}` : ''
		}
	};
});

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});
