import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from "./Pages/HomePage";

import Result from "./Result";
import Login from "./Pages/LoginPage";
import ShoppingCart from "./Components/ShoppingCart";
import SignupPage from './Pages/SignupPage';
import AdminPage from "./Pages/AdminPage";


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
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/adminDashBoard" element={<AdminPage/>} />
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
