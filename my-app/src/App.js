import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
<<<<<<< HEAD
import Home from "./Pages/HomePage";
=======
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from "./HomePage";
>>>>>>> b5902ff3b563f6c3c028cd5d03f3cec61b21e22a
import Result from "./Result";
import Login from "./Pages/login";
import ShoppingCart from "./Components/ShoppingCart";
import SignupPage from './Components/SignupPage';


function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, [location, navigate]);

<<<<<<< HEAD
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/cart" element={<ShoppingCart />} />
    </Routes>
  );
=======
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Result" element={<Result />} />
			<Route path="/Login" element={<Login />} />
			<Route path="/cart" element={<ShoppingCart />} />
			<Route path="/signup" element={<SignupPage />} />
		</Routes>
	);
>>>>>>> b5902ff3b563f6c3c028cd5d03f3cec61b21e22a
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
