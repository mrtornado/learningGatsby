import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { CartProvider } from '../components/store/cartContext';

export const Layout = ({ children }) => (
	<CartProvider>
		<Navbar>
			{children}
			<Footer />
		</Navbar>
	</CartProvider>
);

export default Layout;
