import React from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

export const userContext = React.createContext();

const fullname = 'Mark Rogers';

function Layout({ children }) {
	return (
		<React.Fragment>
			<Navbar />
			<userContext.Provider value={fullname}>{children}</userContext.Provider>
			<Footer />
		</React.Fragment>
	);
}

export default Layout;
