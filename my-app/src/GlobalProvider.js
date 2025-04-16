import App from "./App";
import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

function GlobalProvider() {
	let cartItemsFromSession = JSON.parse(
		sessionStorage.getItem("addedItemsInCart")
	);

	const [cartCount, setCartCount] = useState(
		cartItemsFromSession ? cartItemsFromSession.length : 0
	);
	const [addedItemsInCart, setAddedItemsInCart] = useState(
		cartItemsFromSession || []
	);
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
