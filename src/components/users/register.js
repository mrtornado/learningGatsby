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
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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

function Login() {
	const token = isLoggedIn();
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	function handleChange(event, newValue) {
		setValue(newValue);
	}

	if (token) {
		navigate('/users/profile');
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
						<LinkTab label='Register' />
						<LinkTab label='Login' />
					</Tabs>
				</AppBar>
				{value === 0 && (
					<TabContainer>
						<RegisterForm />
					</TabContainer>
				)}
				{value === 1 && (
					<TabContainer>
						<LoginForm />
					</TabContainer>
				)}
			</div>
		</NoSsr>
	);
}

export default Login;
