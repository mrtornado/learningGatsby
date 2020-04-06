import React from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
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
