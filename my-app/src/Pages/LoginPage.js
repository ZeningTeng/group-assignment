import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_EXPRESS_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        apiUrl + "/user/login",
        { email: email.toLowerCase(), password },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      if (response.data.role === "admin") {
        navigate("/adminDashBoard");
      } else if (response.data.role === "customer") {
        navigate("/");
      }
    } catch (err) {
      setError("wrong password");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedToken && storedUserInfo) {
      navigate("/");
      alert("You are already logged in");
    }
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fffdefd6" }}>
      <div
        style={{
          backgroundImage: `url('/assets/img/loginpage/loginPageBg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 mb-4">
              <div
                className="login-container"
                style={{
                  padding: "30px",
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                <h3
                  className="text-center mb-4"
                  style={{ color: "#333", fontWeight: 600 }}
                >
                  Login
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      required
                      style={{
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <div className="d-flex align-items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control flex-grow-1 me-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      />
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye" : "bi-eye-slash"
                        } password-toggle`}
                        onClick={togglePassword}
                        title="Show/Hide Password"
                        style={{
                          cursor: "pointer",
                          fontSize: "1.2rem",
                          color: "#555",
                        }}
                      ></i>
                    </div>
                  </div>
                  {error && (
                    <div
                      className="error-message"
                      style={{
                        color: "red",
                        textAlign: "center",
                        marginBottom: "10px",
                      }}
                    >
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{
                      backgroundColor: "#FFD700",
                      border: "none",
                      borderRadius: "40px",
                      padding: "12px",
                      fontSize: "16px",
                      fontWeight: 500,
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Login
                  </button>
                  <div className="extra-links mt-3 d-flex justify-content-between">
                    <a
                      href="#"
                      className="text-link"
                      style={{
                        fontSize: "14px",
                        color: "#007bff",
                        textDecoration: "none",
                      }}
                    >
                      Forgot Password?
                    </a>
                    <a
                      href="#"
                      className="text-link"
                      style={{
                        fontSize: "14px",
                        color: "#007bff",
                        textDecoration: "none",
                      }}
                    >
                      Sign Up
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
              <div
                className="about-container"
                style={{
                  padding: "30px",
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                }}
              >
                <h3
                  className="text-center mb-4"
                  style={{ color: "#333", fontWeight: 600 }}
                >
                  Why Choose Us?
                </h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-gem fs-3 text-warning me-2"></i>
                          <h5 className="card-title mb-0">
                            Exquisite Craftsmanship
                          </h5>
                        </div>
                        <p>
                          Our jewelry pieces are crafted with precision and
                          passion, ensuring every item is a masterpiece.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-shield-check fs-3 text-success me-2"></i>
                          <h5 className="card-title mb-0">Unmatched Quality</h5>
                        </div>
                        <p>
                          We use only the finest materials, ensuring durability
                          and brilliance in every piece.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body text-center">
                        <i className="bi bi-globe fs-3 text-secondary"></i>
                        <h5>Community Impact</h5>
                        <p>
                          By shopping with us, you're supporting local artisans
                          and contributing to the growth of our community.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
