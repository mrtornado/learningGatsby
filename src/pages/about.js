import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Link from '../components/material/Link';
import ProTip from '../components/material/ProTip';

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
	return (
		<>
			<Container maxWidth='sm'>
				<Box my={4}>
					<Typography variant='h4' component='h1' gutterBottom>
						Hello From About Page
					</Typography>
					<Link to='/'>Go to the main page</Link>
					<ProTip />
					<MadeWithLove />
				</Box>
			</Container>
		</>
	);
}
