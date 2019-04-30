import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(6, 0, 3)
	}
}));

function Footer() {
	const classes = useStyles();

	return (
		<Typography className={classes.root} color='textPrimary'>
			This page was created with love by{' '}
			<Link href='http://www.google.com'> Tornado </Link>
		</Typography>
	);
}

export default Footer;
