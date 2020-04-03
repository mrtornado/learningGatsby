import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required!')
		.min(4, 'Username needs at least 4 char!'),

	password: yup
		.string()
		.min(6, 'Password needs at least 6 char!')
		.required('Password is required!'),
	contact_name: yup.string().required('Full Name is required!'),
	email_address: yup
		.string()
		.required('Email is required!')
		.email('Must be a valid email!')
});

export const loginValidationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required!')
		.min(4, 'Username needs at least 4 char!'),
	password: yup
		.string()
		.min(6, 'Password needs at least 6 char!')
		.required('Password is required!')
});
