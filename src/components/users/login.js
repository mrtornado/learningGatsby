import AppBar from '@material-ui/core/AppBar';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { isLoggedIn } from '../../utils/auth';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

function TabContainer(props) {
	return (
		<Typography component='div' style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

function LinkTab(props) {
	return (
		<Tab component='a' onClick={(event) => event.preventDefault()} {...props} />
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

function Login(props) {
	const token = isLoggedIn();
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	function handleChange(event, newValue) {
		setValue(newValue);
	}
	if (token && props.location.pathname === '/checkout/') {
		navigate('/checkout');
	}

	if (token) {
		navigate('/user/profile');
	}

	return (
		<NoSsr>
			<div
				className={classes.root}
				style={{
					display: 'block',
					width: '400px',
					borderRadius: '10px',
					margin: '0 auto',
					marginTop: '20px',
				}}
			>
				<AppBar position='static' color='secondary'>
					<Tabs
						variant='fullWidth'
						value={value}
						onChange={handleChange}
						indicatorColor='primary'
					>
						<LinkTab label='Login' />
						<LinkTab label='Register' />
					</Tabs>
				</AppBar>
				{value === 0 && (
					<TabContainer>
						<LoginForm />
					</TabContainer>
				)}
				{value === 1 && (
					<TabContainer>
						<RegisterForm />
					</TabContainer>
				)}
			</div>
		</NoSsr>
	);
}

export default Login;
