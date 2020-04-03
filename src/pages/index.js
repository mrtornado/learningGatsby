import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';
import Link from '../components/material/Link';
import ProTip from '../components/material/ProTip';

function MadeWithLove() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Built with love by the '}
			<MuiLink color='inherit' href='https://www.yourprivateproxy.com/'>
				YPP
			</MuiLink>
			{' team.'}
		</Typography>
	);
}

const MyTypo = styled(Typography)`
	font-size: 22px;
`;

function App() {
	return (
		<React.Fragment>
			<Container maxWidth='sm'>
				<Box my={4}>
					<MyTypo variant='h4' component='h1' gutterBottom>
						Gatsby v4-alpha example
					</MyTypo>
					<Link to='/about' color='primary'>
						Go to the about page
					</Link>
					<ProTip />
					<MadeWithLove />
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default App;
