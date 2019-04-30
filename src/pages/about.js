import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import Link from '../components/material/Link';
import ProTip from '../components/material/ProTip';
import { userContext } from '../layouts';

function MadeWithLove() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Built with love by the '}
			<MuiLink color='inherit' href='https://material-ui.com/'>
				Material-UI
			</MuiLink>
			{' team.'}
		</Typography>
	);
}

export default function App() {
	const value = useContext(userContext);
	console.log(value);

	return (
		<>
			<div>Hello, {value}</div>
			<Container maxWidth='sm'>
				<Box my={4}>
					<Typography variant='h4' component='h1' gutterBottom>
						Gatsby v4-alpha example
					</Typography>
					<Link to='/'>Go to the main page</Link>
					<ProTip />
					<MadeWithLove />
				</Box>
			</Container>
		</>
	);
}
