import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./HomePage";
import Result from "./Result";
import Login from "./login";
import ShoppingCart from "./Components/ShoppingCart";

function App() {
	const token = localStorage.getItem("token");
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {}, [location, navigate]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Result" element={<Result />} />
			<Route path="/Login" element={<Login />} />
			<Route path="/cart" element={<ShoppingCart />} />
		</Routes>
	);
}

export default function AppWithRouter() {
	return (
		<Router>
			<App />
		</Router>
	);
}
