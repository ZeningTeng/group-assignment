import App from "./App";
import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

function GlobalProvider() {
	let cartItemsFromSession = JSON.parse(
		sessionStorage.getItem("addedItemsInCart")
	);

	const [allProducts, setAllProducts] = useState([]);

	const [cartCount, setCartCount] = useState(
		cartItemsFromSession ? cartItemsFromSession.length : 0
	);
	const [addedItemsInCart, setAddedItemsInCart] = useState(
		cartItemsFromSession || []
	);

	useEffect(() => {
		console.log("cartCount initialized:", cartCount);
	}, []);

	useEffect(() => {
		sessionStorage.setItem(
			"addedItemsInCart",
			JSON.stringify(addedItemsInCart)
		);
		setCartCount(addedItemsInCart.length);
	}, [addedItemsInCart]);

	return (
		<AppContext.Provider
			value={{
				cartCount,
				setCartCount,
				addedItemsInCart,
				setAddedItemsInCart,
				allProducts,
				setAllProducts,
			}}
		>
			<App />
		</AppContext.Provider>
	);
}

export default GlobalProvider;
