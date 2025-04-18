import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import Home from "./Pages/HomePage";

import Result from "./Result";
import Login from "./Pages/LoginPage";
import ShoppingCart from "./Components/ShoppingCart";
import SignupPage from "./Pages/SignupPage";
import AdminPage from "./Pages/AdminPage";
import SupplierPage from "./Pages/SupplierPage";
import Unauthorized from "./Pages/Unauthorized";

function App() { 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/adminDashBoard" element={<AdminPage />} />
      <Route path="/supplierDashBoard" element={<SupplierPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
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
