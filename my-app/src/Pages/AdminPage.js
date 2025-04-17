import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AdminNavBar from "../Components/AdminNavBar";
import AdminDashBoard from "../Components/AdminUser";
import AdminProduct from "../Components/AdminProduct";
import Footer from "../Components/Footer";
import { Navigate } from "react-router-dom";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState("dashboard");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("token");

    if (user && user.role === "admin" && token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <div>Loading...</div>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <div>
      <AdminNavBar onPageChange={handlePageChange} />

      {selectedPage === "dashboard" && <AdminDashBoard />}
      {selectedPage === "products" && <AdminProduct />}
      <Footer />
    </div>
  );
}

export default AdminPage;
