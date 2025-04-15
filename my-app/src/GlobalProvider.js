import App from "./App";
import React, { createContext, useState } from "react";
export const AppContext = createContext();

function GlobalProvider() {
	const [cartCount, setCartCount] = useState(0);

	return (
		<AppContext.Provider value={{ cartCount, setCartCount }}>
			<App />;
		</AppContext.Provider>
	);
}

export default GlobalProvider;
