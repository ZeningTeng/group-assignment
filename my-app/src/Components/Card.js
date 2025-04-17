import React, { useState, useEffect } from "react";
import axios from "axios";

function Card() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;

  useEffect(() => {
    axios
      .get(apiUrl + "/product/getAll")
      .then((response) => {
        const recentProducts = response.data.products.slice(0, 6);
        setProducts(recentProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the products data!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="container">
      {/* Row to hold the products */}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {product.type === "sale" && (
                <div
                  className="badge bg-dark text-white position-absolute"
                  style={{
                    top: "0.5rem",
                    right: "0.5rem",
                  }}
                >
                  Sale
                </div>
              )}

              {/* Product image */}
              <img
                className="card-img-top img-fluid"
                src={product.image}
                alt={product.name}
                style={{ height: "250px", objectFit: "cover" }}
              />

              {/* Product details */}
              <div className="card-body p-4">
                <div className="text-center">
                  <h5 className="fw-bolder">{product.name}</h5>
                  <div className="d-flex justify-content-center small text-warning mb-2">
                    <div className="bi-star-fill" />
                    <div className="bi-star-fill" />
                    <div className="bi-star-fill" />
                    <div className="bi-star-fill" />
                    <div className="bi-star-fill" />
                  </div>
                  {product.oldPrice && (
                    <span className="text-muted text-decoration-line-through">
                      ${product.oldPrice}
                    </span>
                  )}
                  ${product.price}
                </div>
              </div>

              {/* Product actions */}
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div className="text-center">
                  <a className="btn btn-outline-dark mt-auto" href="#">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
