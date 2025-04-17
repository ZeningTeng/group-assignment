import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios to handle HTTP requests

function Card() {
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    
    axios.get("/api/products") 
      .then(response => {
        setProducts(response.data.products); // Assuming response contains the products array
        setLoading(false); 
      })
      .catch(error => {
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
    <div className="row">
      {products.map((product) => (
        <div className="col mb-5" key={product.id}>
          <div className="card h-100">
            {/* Sale badge only if product type is 'special' */}
            {product.type === "special" && (
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
              className="card-img-top"
              src={product.image} // Use the image URL from the API response
              alt={product.name}
            />

            {/* Product details */}
            <div className="card-body p-4">
              <div className="text-center">
                {/* Product name */}
                <h5 className="fw-bolder">{product.name}</h5>

                {/* Product reviews (assuming there are no reviews for now) */}
                <div className="d-flex justify-content-center small text-warning mb-2">
                  <div className="bi-star-fill" />
                  <div className="bi-star-fill" />
                  <div className="bi-star-fill" />
                  <div className="bi-star-fill" />
                  <div className="bi-star-fill" />
                </div>

                {/* Product price */}
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
  );
}

export default Card;
