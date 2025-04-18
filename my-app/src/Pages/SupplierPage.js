import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "../Components/Footer";
import { Navigate } from "react-router-dom";
import SupplierNavBar from "../Components/SupplierNavBar";
import SupplierProduct from "../Components/SupplierProduct";
import SupplierUser from "../Components/SupplierUser";

function SupplierPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState("dashboard");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("token");

    if (user && user.role === "supplier" && token) {
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
    return <Navigate to="/unauthorized" />;
  }

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <div>
      <SupplierNavBar onPageChange={handlePageChange} />
      {selectedPage === "dashboard" && <SupplierUser/>}
      {selectedPage === "products" && <SupplierProduct />}
      <Footer />
    </div>
  );
}

export default SupplierPage;
