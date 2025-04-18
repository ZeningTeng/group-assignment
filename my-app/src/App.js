import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./HomePage";
import Result from "./Result";
import Login from "./login";
import ShoppingCart from "./Components/ShoppingCart";
import Checkout from "./Components/Checkout";
import OrderHistory from "./Components/OrderHistory";
import ControlPanel from "./controlPanel";
import SuccessPage from "./Components/SuccessPage";
import AdminPage from "./Pages/AdminPage";
import SupplierPage from "./Pages/SupplierPage";
import Unauthorized from "./Pages/Unauthorized";


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
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/adminDashBoard" element={<AdminPage />} />
      <Route path="/supplierDashBoard" element={<SupplierPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/controlPanel" element={<ControlPanel />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<Navigate to="/cart" replace />} />
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
