import React from 'react';

export const userContext = React.createContext();

const fullname = 'Mark Rogers';

function Layout({ children }) {
	return (
		<React.Fragment>
			<userContext.Provider value={fullname}>{children}</userContext.Provider>
		</React.Fragment>
	);
}

export default Layout;
