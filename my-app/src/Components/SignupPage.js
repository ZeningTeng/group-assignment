import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(formData.name.trim())) {
      newErrors.name = "Please enter both first and last name";
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/.test(formData.password)) {
      newErrors.password = "Password must include uppercase, lowercase, number and special character";
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await axios.post("http://localhost:8000/user/create", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: "user" 
      });
      
      setFormSuccess(true);
      
      // Redirecting to login after showing success message
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || "An error occurred during registration";
      
      if (errorMessage.includes("email")) {
        setErrors(prev => ({ ...prev, email: errorMessage }));
      } else if (errorMessage.includes("password")) {
        setErrors(prev => ({ ...prev, password: errorMessage }));
      } else {
        setErrors(prev => ({ ...prev, general: errorMessage }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSuccess) {
    return (
      <div className="signup-success-container">
        <div className="signup-success-card">
          <div className="success-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <h2>Registration Successful!</h2>
          <p>Your account has been created. Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page-container">
      <div className="signup-content-wrapper">
        <div className="signup-form-section">
          <div className="form-container">
            <h2>Create Account</h2>
            <p className="subtitle">Join our community to explore our premium jewelry collection</p>
            
            {errors.general && <div className="error-alert">{errors.general}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-with-icon">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <i className="bi bi-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
							<div className="form-group">
				<label htmlFor="password">Password</label>
				<div className="input-with-icon">
					<i className="bi bi-lock"></i>
					<input
					type={showPassword ? "text" : "password"}
					id="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className={errors.password ? "error" : ""}
					placeholder="Create a strong password"
					/>
					<button
					type="button"
					className="toggle-password"
					onClick={togglePassword}
					>
					<i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
					</button>
				</div>
				{errors.password && <span className="error-message">{errors.password}</span>}
				
				<div className="password-strength-meter">
					<div className={`strength-bar ${formData.password.length > 0 ? "strength-weak" : ""}`}></div>
					<div className={`strength-bar ${formData.password.length >= 8 ? "strength-medium" : ""}`}></div>
					<div className={`strength-bar ${/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])/.test(formData.password) ? "strength-strong" : ""}`}></div>
				</div>
				<div className="password-hint">Password should contain at least 8 characters with uppercase, lowercase, number and special character</div>
				</div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <i className="bi bi-lock-fill"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "error" : ""}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
              
              <button type="submit" className="signup-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
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