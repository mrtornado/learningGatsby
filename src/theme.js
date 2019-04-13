import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#CD0000'
		},
		secondary: {
			main: '#19857b'
		},
		error: {
			main: red.A400
		},
		background: {
			default: '#fff'
		}
	},
	typography: {
		// In Japanese the characters are usually larger.
		fontSize: 15,
		textPrimary: '#CD0000'
	}
});

export default theme;
