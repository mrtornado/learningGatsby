import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import { FaEnvelope, FaGlobeAmericas, FaUserAstronaut } from 'react-icons/fa';
import styled from 'styled-components';
import Link from '../components/material/Link';
import { decodedToken, isLoggedIn } from '../utils/auth';
import { ME } from '../utils/graphql/userGraph';

const drawerWidth = 180;

const StyledDrawer = styled(Drawer)`
	& > div {
		background-image: linear-gradient(to top, #ffe259, #ffa751);
	}
`;

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
	root: {
		display: 'flex'
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},

	menuButton: {
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	toolbarTitle: {
		flexGrow: 1,
		[theme.breakpoints.up('md')]: {
			justifySelf: 'auto'
		}
	},
	link: {
		margin: theme.spacing(1, 1.5),
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'inline-block'
		}
	},
	iconButton: {
		margin: theme.spacing(1, 1.5),
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'inline-block'
		}
	},
	heroContent: {
		padding: theme.spacing(8, 0, 6)
	}
}));

function removeToken() {
	window.localStorage.removeItem('x-auth-token');
}

export default function NavBar({ children }) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	function handleDrawerOpen() {
		setOpen(true);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	const loginUser = isLoggedIn();
	const decoded = decodedToken();
	let leftNavBar;
	if (decoded.member_type === 'admin') {
		leftNavBar = (
			<List>
				<ListItem button onClick={() => navigate('/user/profile')}>
					<ListItemIcon>
						<FaUserAstronaut style={{ color: '#2196f3', fontSize: '30' }} />
					</ListItemIcon>
					<ListItemText style={{ color: '#e91e63' }} primary='Sugi' />
				</ListItem>

				<ListItem button>
					<ListItemIcon>
						<FaGlobeAmericas style={{ color: '#2196f3', fontSize: '30' }} />
					</ListItemIcon>
					<ListItemText style={{ color: '#e91e63' }} primary='Pula' />
				</ListItem>

				<ListItem button>
					<ListItemIcon>
						<Badge badgeContent={4} color='secondary'>
							<FaEnvelope style={{ color: '#2196f3', fontSize: '30' }} />
						</Badge>
					</ListItemIcon>
					<ListItemText style={{ color: '#e91e63' }} primary='Admin' />
				</ListItem>
			</List>
		);
	} else {
		leftNavBar = (
			<List>
				<ListItem button onClick={() => navigate('/user/profile')}>
					<ListItemIcon>
						<FaUserAstronaut style={{ color: '#2196f3', fontSize: '30' }} />
					</ListItemIcon>
					<ListItemText style={{ color: '#e91e63' }} primary='Profile' />
				</ListItem>

				<ListItem button>
					<ListItemIcon>
						<FaGlobeAmericas style={{ color: '#2196f3', fontSize: '30' }} />
					</ListItemIcon>
					<ListItemText style={{ color: '#e91e63' }} primary='Proxies' />
				</ListItem>

				<ListItem button>
					<ListItemIcon>
						<Badge badgeContent={4} color='secondary'>
							<FaEnvelope style={{ color: '#2196f3', fontSize: '30' }} />
						</Badge>
					</ListItemIcon>
					<ListItemText style={{ color: '#e91e63' }} primary='Tickets' />
				</ListItem>
			</List>
		);
	}

	useEffect(() => {
		if (loginUser) {
			handleDrawerOpen();
		}
	}, [loginUser]);

	return (
		<Query query={ME}>
			{({ loading, error, data }) => {
				if (loading) return 'Loading...';
				if (error)
					return `Error! ${error.message}, YES !! you are a hacker :))))`;

				return (
					<div className={classes.root}>
						<CssBaseline />
						<AppBar
							style={{
								backgroundImage: 'linear-gradient(to left, #ffe259, #ffa751)'
							}}
							position='fixed'
							color='default'
							elevation={0}
							className={clsx(classes.appBar, {
								[classes.appBarShift]: open
							})}
						>
							<Toolbar className={classes.toolbar}>
								{loginUser ? (
									<IconButton
										color='secondary'
										aria-label='Open drawer'
										onClick={handleDrawerOpen}
										edge='start'
										className={clsx(classes.menuButton, {
											[classes.hide]: open
										})}
									>
										<MenuIcon />
									</IconButton>
								) : null}
								<Switch />
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
								{!loginUser ? (
									<React.Fragment>
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
										<Button
											onClick={(event) => {
												event.preventDefault();
												navigate('/user/register');
											}}
											color='secondary'
											variant='outlined'
											className={classes.link}
										>
											Register
										</Button>

										<IconButton
											color='secondary'
											// aria-label='Open drawer'
											// onClick={handleDrawerOpen}
											edge='end'
											className={classes.iconButton}
										>
											<MenuIcon />
										</IconButton>
									</React.Fragment>
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
												handleDrawerClose();
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
						{loginUser ? (
							<StyledDrawer
								variant='permanent'
								className={clsx(classes.drawer, {
									[classes.drawerOpen]: open,
									[classes.drawerClose]: !open
								})}
								classes={{
									paper: clsx({
										[classes.drawerOpen]: open,
										[classes.drawerClose]: !open
									})
								}}
								open={open}
							>
								<div className={classes.toolbar}>
									<IconButton onClick={handleDrawerClose}>
										{theme.direction === 'rtl' ? (
											<ChevronRightIcon />
										) : (
											<ChevronLeftIcon />
										)}
									</IconButton>
								</div>
								{leftNavBar}
							</StyledDrawer>
						) : null}
						<main className={classes.content}>
							<div className={classes.toolbar} />
							{children}
						</main>
					</div>
				);
			}}
		</Query>
	);
}
