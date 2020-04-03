import React from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

export const Layout = ({ reducer, initialState, children }) => (
	<Navbar>
		{children}
		<Footer />
	</Navbar>
);

export default Layout;
