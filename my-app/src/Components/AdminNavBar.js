import React from "react";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminNavBar({ onPageChange }) {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => onPageChange("dashboard")}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => onPageChange("products")}>
          Products
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavBar;
