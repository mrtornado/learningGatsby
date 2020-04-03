import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN_USER } from '../../utils/graphql/userGraph';
import { loginValidationSchema } from '../../utils/validationSchema';

const styles = {
	root: {
		background: '#d22e2e'
	}
};

const LoginForm = (props) => {
	const [open, setOpen] = useState(false);
	const [snackMessage, setSnackMessage] = useState();
	const { classes, children, className, ...other } = props;

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Mutation mutation={LOGIN_USER}>
				{(login, { loading, error }) => (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							alignSelf: 'center',
							flexDirection: 'column',
							width: '400px',
							backgroundImage: 'linear-gradient(to right, #ffe259, #ffa751)',
							borderRadius: '10px',
							margin: '10px'
						}}
					>
						<h2 style={{ color: 'white' }}>Login Form</h2>
						<Formik
							initialValues={{
								username: '',
								password: ''
							}}
							validationSchema={loginValidationSchema}
							onSubmit={(values, { setSubmitting }) => {
								login({
									variables: {
										username: values.username,
										password: values.password
									}
								})
									.then(({ data }) => {
										setSubmitting(false);
										window.localStorage.setItem(
											'x-auth-token',
											data.login.token
										);
										window.location.reload();
									})
									.catch((error) => {
										setSnackMessage(error.graphQLErrors[0].message);
										setOpen(true);
										setSubmitting(false);
									});
							}}
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
										Login
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

export default withStyles(styles)(LoginForm);
