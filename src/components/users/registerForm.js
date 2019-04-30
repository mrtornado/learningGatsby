import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { REGISTER_USER } from '../../utils/graphql/userGraph';
import { registerValidationSchema } from '../../utils/validationSchema';

const styles = {
	root: {
		background: '#d22e2e'
	}
};

const RegisterForm = (props) => {
	const [open, setOpen] = useState(false);
	const [snackMessage, setSnackMessage] = useState();
	const { classes, children, className, ...other } = props;

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Mutation mutation={REGISTER_USER}>
				{(register, { loading, error }) => (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							alignSelf: 'center',
							flexDirection: 'column',
							width: '400px',
							backgroundImage: 'linear-gradient(to top, #8e9eab, #eef2f3)',
							borderRadius: '10px',
							margin: '10px'
						}}
					>
						<h2>Register Form</h2>
						<Formik
							initialValues={{
								contact_name: '',
								email_address: '',
								username: '',
								password: ''
							}}
							onSubmit={(values, { setSubmitting, resetForm }) => {
								register({
									variables: {
										email_address: values.email_address,
										contact_name: values.contact_name,
										username: values.username,
										password: values.password
									}
								})
									.then(({ data }) => {
										setSubmitting(false);
										resetForm();
										setSnackMessage(`Congrats, you signed up successfuly`);
										setOpen(true);
									})
									.catch((error) => {
										setSnackMessage(() => {
											if (
												error.graphQLErrors[0].extensions.exception.errors !==
												undefined
											) {
												return error.graphQLErrors[0].extensions.exception
													.errors[0].message;
											} else {
												return error.graphQLErrors[0].message;
											}
										});
										setOpen(true);
										setSubmitting(false);
									});
							}}
							validationSchema={registerValidationSchema}
						>
							{({ values, handleChange, handleBlur, isSubmitting }) => (
								<Form
									style={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'column',
										maxWidth: '300px'
									}}
								>
									<TextField
										margin='normal'
										label='Full Name'
										type='contact_name'
										name='contact_name'
										value={values.contact_name}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<ErrorMessage
										name='contact_name'
										render={(msg) => (
											<div style={{ color: '#d22e2e' }}>{msg}</div>
										)}
									/>
									<TextField
										value={values.email_address}
										onChange={handleChange}
										margin='normal'
										label='Email'
										type='email'
										name='email_address'
										onBlur={handleBlur}
									/>
									<ErrorMessage
										name='email_address'
										render={(msg) => (
											<div style={{ color: '#d22e2e' }}>{msg}</div>
										)}
									/>

									<TextField
										margin='normal'
										label='Username'
										type='username'
										name='username'
										value={values.username}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<ErrorMessage
										name='username'
										render={(msg) => (
											<div style={{ color: '#d22e2e' }}>{msg}</div>
										)}
									/>

									<TextField
										margin='normal'
										label='Password'
										type='password'
										name='password'
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<ErrorMessage
										name='password'
										render={(msg) => (
											<div style={{ color: '#d22e2e' }}>{msg}</div>
										)}
									/>
									<Button
										variant='contained'
										color='primary'
										type='submit'
										disabled={isSubmitting}
									>
										Register
									</Button>
								</Form>
							)}
						</Formik>
					</div>
				)}
			</Mutation>
			<Snackbar
				ContentProps={{
					classes: {
						root: classes.root
					}
				}}
				{...other}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				open={open}
				onClose={() => setOpen(false)}
				autoHideDuration={5000}
				message={snackMessage}
			/>
		</div>
	);
};

export default withStyles(styles)(RegisterForm);
