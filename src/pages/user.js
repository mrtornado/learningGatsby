import { Router } from '@reach/router';
import React from 'react';
import PrivateRoute from '../components/privateRoute';
import Config from '../components/users/config';
import Login from '../components/users/login';
import Profile from '../components/users/profile';

const User = () => (
	<React.Fragment>
		<Router>
			<PrivateRoute path='/user/profile' component={Profile} />
			<PrivateRoute path='/user/:id' component={Config} />
			<Login path='/user/login' />
		</Router>
	</React.Fragment>
);

export default User;

// import AppBar from '@material-ui/core/AppBar';
// import NoSsr from '@material-ui/core/NoSsr';
// import { makeStyles } from '@material-ui/core/styles';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import Typography from '@material-ui/core/Typography';
// import PropTypes from 'prop-types';
// import React from 'react';
// import LoginForm from '../components/users/loginForm';
// import Profile from '../components/users/profile';
// import RegisterForm from '../components/users/registerForm';

// function TabContainer(props) {
// 	return (
// 		<Typography component='div' style={{ padding: 8 * 3 }}>
// 			{props.children}
// 		</Typography>
// 	);
// }

// TabContainer.propTypes = {
// 	children: PropTypes.node.isRequired
// };

// function LinkTab(props) {
// 	return (
// 		<Tab component='a' onClick={(event) => event.preventDefault()} {...props} />
// 	);
// }

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1,
// 		backgroundColor: theme.palette.background.paper
// 	}
// }));

// function Login() {
// 	const token =
// 		typeof window !== 'undefined' &&
// 		window.localStorage.getItem('x-auth-token');
// 	const classes = useStyles();
// 	const [value, setValue] = React.useState(0);

// 	function handleChange(event, newValue) {
// 		setValue(newValue);
// 	}

// 	if (token) {
// 		return <Profile />;
// 	}

// 	return (
// 		<NoSsr>
// 			<div
// 				className={classes.root}
// 				style={{
// 					display: 'block',
// 					width: '400px',
// 					borderRadius: '10px',
// 					margin: '0 auto',
// 					marginTop: '20px'
// 				}}
// 			>
// 				<AppBar position='static' color='secondary'>
// 					<Tabs
// 						variant='fullWidth'
// 						value={value}
// 						onChange={handleChange}
// 						indicatorColor='primary'
// 					>
// 						<LinkTab label='Login' />
// 						<LinkTab label='Register' />
// 					</Tabs>
// 				</AppBar>
// 				{value === 0 && (
// 					<TabContainer>
// 						<LoginForm />
// 					</TabContainer>
// 				)}
// 				{value === 1 && (
// 					<TabContainer>
// 						<RegisterForm />
// 					</TabContainer>
// 				)}
// 			</div>
// 		</NoSsr>
// 	);
// }

// export default Login;
