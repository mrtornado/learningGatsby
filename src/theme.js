import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33eb91',
			main: '#00a152',
			dark: '#006400'
		},
		secondary: {
			light: '#ed4b82',
			main: '#e91e63',
			dark: '#a31545'
		},
		text: {
			primary: '#000000',
			secondary: '#2196f3'
		},
		error: {
			main: '#CD0000'
		},
		type: 'light'
	},
	typography: {
		// In Japanese the characters are usually larger.
		fontFamily: 'Roboto',
		fontSize: 16,
		textPrimary: '#CD0000'
	}
});

export default theme;
