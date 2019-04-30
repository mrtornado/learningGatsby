import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
	username: yup.string().required('Username is required!'),
	password: yup
		.string()
		.min(6, 'Password has to be longer than 6 characters!')
		.required('Password is required!'),
	contact_name: yup.string().required('Full Name is required!'),
	email_address: yup
		.string()
		.required('Email is required!')
		.email('Must be a correct email!')
});

export const loginValidationSchema = yup.object().shape({
	username: yup.string().required('Username is required!'),
	password: yup
		.string()
		.min(6, 'Password has to be longer than 6 characters!')
		.required('Password is required!')
});
