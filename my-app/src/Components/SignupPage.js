import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/user/create", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: "user" 
      });
      
      navigate('/login');
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-content-wrapper">
        <div className="signup-form-section">
          <div className="form-container">
            <h2>Create Account</h2>
            <p className="subtitle">Join our community to explore our premium jewelry collection</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>
              
              <button type="submit" className="signup-button">
                Create Account
              </button>
            </form>
            
            <div className="auth-footer">
              <p>Already have an account? <a onClick={() => navigate('/login')} className="login-link">Sign In</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;