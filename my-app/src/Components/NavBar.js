import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

function NavBar() {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserInfo(null);
    handleMenuClose();
    navigate("/");
    alert("You have logged out successfully. Thank you for Shopping With us !");
  };
  const [token, setToken] = useState(null);

  const [userInfo, setUserInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logout, setlogout] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      axios
        .get(apiUrl + "/profile", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.user);
          setUserInfo(res.data.user);
        })
        .catch((err) => {
          console.error("failed", err);
        });
    }
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <nav aria-label="breadcrumb"></nav>
        <div className="container px-4 px-lg-1">
          <a className="navbar-brand" href="#!">
            Jewelry Shop
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#!">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#accordionExample">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  more about us
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#!">
                      All Products
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Popular Items
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      New Arrivals
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <SearchBar />
            <form className="d-flex me-3">
              <Link to="/cart">
                <button className="btn btn-outline-dark" type="submit">
                  <i className="bi-cart-fill me-1" />
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">
                    0
                  </span>
                </button>
              </Link>
            </form>
            <ul className="navbar-nav ">
              <li className="nav-item">
                {userInfo ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
                      {userInfo.name}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleSignOut}
                      sx={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                      }}
                    >
                      Log Out
                    </Button>
                  </Box>
                ) : (
                  <Button onClick={goToLogin}>Login Page</Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
