import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Snackbar, Button } from "@mui/material";

function Card({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const showAll = !isHomePage;
  const productsPerRow = isHomePage ? 3 : 4;
  const columnClass = `col-md-${12 / productsPerRow}`;

  useEffect(() => {
    axios
      .get(apiUrl + "/product/getAll")
      .then((response) => {
        const fetchedProducts = response.data.products;
        const limitedProducts = showAll
          ? fetchedProducts
          : fetchedProducts.slice(0, 6);
        setProducts(limitedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [showAll]);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddToCart = (product) => {
    const isProductInCart = cart.some(
      (cartProduct) => cartProduct._id === product._id
    );

    if (isProductInCart) {
      setSnackbarMessage(`${product.name} is already in your cart!`);
      setOpenSnackbar(true);
    } else {
      const productWithQuantity = { ...product, quantity: 1 };
      const newCart = [...cart, productWithQuantity];

      setCart(newCart);
      setSnackbarMessage(`${product.name} added to cart!`);
      setOpenSnackbar(true);

      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (filteredProducts.length === 0) return <div>No products found.</div>;

  return (
    <div className="container">
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product._id} className={`${columnClass} mb-4`}>
            <div className="card h-100">
              {/* Sale badge */}
              {product.type === "sale" && (
                <div
                  className="badge bg-dark text-white position-absolute"
                  style={{ top: "0.5rem", right: "0.5rem" }}
                >
                  Sale
                </div>
              )}

              {/* Product Image */}
              <img
                className="card-img-top img-fluid"
                src={product.image}
                alt={product.name}
                style={{ height: "250px", objectFit: "cover" }}
              />

              {/* Product Details */}
              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="fw-bolder">{product.name}</h5>
                  {product.oldPrice && (
                    <span className="text-muted text-decoration-line-through me-2">
                      ${product.oldPrice}
                    </span>
                  )}
                  ${product.price}
                </div>
              </div>

              {/* Product Actions */}
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                  <Button
                    className="btn btn-outline-dark mt-auto"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Snackbar for Add to Cart */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  );
}

export default Card;
