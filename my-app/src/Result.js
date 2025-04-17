import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function NavItem() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <li className="nav-item">
      <a className="nav-link active" aria-current="page" onClick={handleClick}>
        Home
      </a>
    </li>
  );
}
function SearchBar() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(apiUrl + "search", {
      params: { name },
    });
    navigate("/result", { state: { results: response.data } });
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <input
          type="name"
          placeholder="Search some thing here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px" }}>
          search
        </button>
      </form>
    </div>
  );
}

const ResultPage = () => {
  const { state } = useLocation();
  let results = state?.results || [];
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;

  useEffect(() => {
    console.log("Received results:", results);
  }, [results]);

  if (!Array.isArray(results)) {
    results = [results];
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              <NavItem />

              <li className="nav-item">
                <a className="nav-link" href="#!">
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
            <form className="d-flex">
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi-cart-fill me-1" />
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  0
                </span>
              </button>
            </form>
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link" href="loginPage/Login.html">
                  Login
                </a>
              </li>
            </ul>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </nav>

      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        {results[0]?.products?.length === 0 ? (
          <Typography variant="h5" align="center">
            Sorry, nothing found.
          </Typography>
        ) : (
          results.map((outerItem, i) =>
            outerItem.products.map((product, j) => (
              <Card
                key={`${i}-${j}`}
                variant="outlined"
                sx={{
                  marginBottom: "1rem",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  overflow: "visible",
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {product.name || "No Name"}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Price: {product.price || "N/A"}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Count: {product.count || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "0.5rem" }}>
                    {product.description || "No Description"}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="600"
                    image={`${apiUrl}${product.image}`}
                    alt={product.name}
                    sx={{ marginTop: "1rem" }}
                  />
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                      fontSize: "16px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            ))
          )
        )}
      </Container>
    </div>
  );
};

export default ResultPage;
