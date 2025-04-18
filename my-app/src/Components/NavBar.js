import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Button, Typography, Box } from "@mui/material";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Track the current route

  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserInfo(null);
    navigate("/");
    alert("You have logged out successfully. Thank you for Shopping With us!");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  const goToLogin = () => {
    navigate("/login");
  };

  const isShopPage = location.pathname === "/shop";

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-1">
          <Link className="navbar-brand" to="/">
            Jewelry Shop
          </Link>
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
              {/* Hide "About" and "More about us" links on Shop page */}
              {!isShopPage && (
                <>
                  <a className="nav-link" href="#accordionExample">
                    About
                  </a>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      More about us
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link" to="/shop">
                      Shop
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <form className="d-flex me-3">
              <Link to="/cart">
                <button className="btn btn-outline-dark" type="submit">
                  <i className="bi-cart-fill me-1" /> Cart
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
                    <Typography
                      variant="subtitle1"
                      sx={{
                        marginRight: 2,
                        "& a": {
                          textDecoration: "none",
                          color: "inherit",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                            color: "primary.main",
                          },
                        },
                      }}
                    >
                      <Link
                        to={
                          userInfo.role === "admin"
                            ? "/adminDashboard"
                            : userInfo.role === "supplier"
                            ? "/supplierDashboard"
                            : `/`
                        }
                      >
                        {userInfo.name}
                      </Link>
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
