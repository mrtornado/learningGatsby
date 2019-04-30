import decode from 'jwt-decode';

export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () =>
	isBrowser() && window.localStorage.getItem('x-auth-token')
		? window.localStorage.getItem('x-auth-token')
		: null;

export const isLoggedIn = () => {
	const token = getUser();
	try {
		decode(token);
	} catch (err) {
		return false;
	}

	return true;
};

export const decodedToken = () => {
	const user = getUser();
	const decodedUser = decode(user);

	return decodedUser;
};
