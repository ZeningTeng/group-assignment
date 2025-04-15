import App from "./App";
import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

function GlobalProvider() {
	const [cartCount, setCartCount] = useState(0);
	const [addedItemsInCart, setAddedItemsInCart] = useState([]);
	const [cartTotalPrice, setCartTotalPrice] = useState(0);

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
				cartTotalPrice,
				setCartTotalPrice,
			}}
		>
			<App />
		</AppContext.Provider>
	);
}

export default GlobalProvider;
