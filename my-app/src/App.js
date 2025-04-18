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
import SignupPage from "./Pages/SignupPage";
import AdminPage from "./Pages/AdminPage";
import SupplierPage from "./Pages/SupplierPage";
import Unauthorized from "./Pages/Unauthorized";
import ShopPage from "./Pages/ShopPage";
import CartPage from "./Pages/CartPage";

function App() { 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/Login" element={<Login />} />     
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/adminDashBoard" element={<AdminPage />} />
      <Route path="/supplierDashBoard" element={<SupplierPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />
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
