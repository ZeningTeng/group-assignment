import App from "./App";
import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

function GlobalProvider() {
	const [cartCount, setCartCount] = useState(0);
	const [addedItemsInCart, setAddedItemsInCart] = useState([]);

	useEffect(() => {
		console.log("cartCount initialized:", cartCount);
	}, []);

	return (
		<AppContext.Provider
			value={{
				cartCount,
				setCartCount,
				addedItemsInCart,
				setAddedItemsInCart,
			}}
		>
			<App />
		</AppContext.Provider>
	);
}

export default GlobalProvider;
