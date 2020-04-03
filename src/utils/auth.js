import jwt_decode from 'jwt-decode';

export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () =>
	isBrowser() && window.localStorage.getItem('x-auth-token')
		? window.localStorage.getItem('x-auth-token')
		: null;

export const isLoggedIn = () => {
	const token = getUser();

	try {
		jwt_decode(token);
	} catch (err) {
		return false;
	}

	return true;
};

export const decodedToken = () => {
	try {
		const user = getUser();
		const decodedUser = jwt_decode(user);

		return decodedUser;
	} catch (err) {
		return false;
	}
};
