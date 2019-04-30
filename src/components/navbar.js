import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { navigate } from 'gatsby';
import React from 'react';
import Link from '../components/material/Link';

const useStyles = makeStyles((theme) => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white
		},
		ul: {
			margin: 0,
			padding: 0
		},
		li: {
			listStyle: 'none'
		}
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	toolbar: {
		flexWrap: 'wrap'
	},
	toolbarTitle: {
		flexGrow: 1
	},
	link: {
		margin: theme.spacing(1, 1.5)
	},
	heroContent: {
		padding: theme.spacing(8, 0, 6)
	}
}));

function removeToken() {
	window.localStorage.removeItem('x-auth-token');
}

export default function NavBar() {
	const classes = useStyles();
	const token =
		typeof window !== 'undefined' &&
		window.localStorage.getItem('x-auth-token');

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				style={{
					backgroundImage: 'linear-gradient(to left, #ffe259, #ffa751)'
				}}
				position='static'
				color='default'
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='secondary'
						aria-label='Menu'
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						color='inherit'
						noWrap
						className={classes.toolbarTitle}
					>
						<Link color='secondary' to='/'>
							{' '}
							Your Private Proxy
						</Link>
					</Typography>
					<nav>
						<Link
							to='/buy-private-proxies'
							variant='button'
							color='textSecondary'
							className={classes.link}
						>
							Buy Proxies
						</Link>
						<Link
							to='/blog'
							variant='button'
							color='textSecondary'
							className={classes.link}
						>
							Blog
						</Link>
						<Link
							to='/locations'
							variant='button'
							color='textSecondary'
							className={classes.link}
						>
							Locations
						</Link>
					</nav>
					{!token ? (
						<Button
							onClick={(event) => {
								event.preventDefault();
								navigate('/user/login');
							}}
							color='secondary'
							variant='outlined'
							className={classes.link}
						>
							Login
						</Button>
					) : (
						<React.Fragment>
							<Button
								onClick={(event) => {
									event.preventDefault();
									navigate('/user/profile');
								}}
								color='secondary'
								variant='outlined'
								className={classes.link}
							>
								Member
							</Button>
							<Button
								onClick={(event) => {
									event.preventDefault();
									removeToken();
									navigate('/');
								}}
								color='secondary'
								variant='outlined'
								className={classes.link}
							>
								Logout
							</Button>
						</React.Fragment>
					)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}
