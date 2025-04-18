import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Footer from "../Components/Footer";
import { Navigate } from "react-router-dom";

function SupplierPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true); 

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
    return <Navigate to="/login" />;
  }

 

  return (
    <div>
      {" "}
      <Footer />
    </div>
  );
}

export default SupplierPage;
