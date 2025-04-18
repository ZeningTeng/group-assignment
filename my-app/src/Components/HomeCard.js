import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function HomeCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const productsPerRow = isHomePage ? 3 : 4;
  const columnClass = `col-md-${12 / productsPerRow}`;

  useEffect(() => {
    axios
      .get(apiUrl + "/product/getAll")
      .then((response) => {
        const fetchedProducts = response.data.products;
        // Show only the first 6 products on homepage
        const limitedProducts = isHomePage
          ? fetchedProducts.slice(0, 6)
          : fetchedProducts;
        setProducts(limitedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [isHomePage]);

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return <div>No products available.</div>;

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
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
                  {/* {product.oldPrice && (
                    <span className="text-muted text-decoration-line-through me-2">
                      ${product.oldPrice}
                    </span>
                  )}
                  ${product.price} */}
                </div>
              </div>

              {/* Product Actions */}
              {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                  <a className="btn btn-outline-dark mt-auto" href="#">
                    Add to cart
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeCard;
