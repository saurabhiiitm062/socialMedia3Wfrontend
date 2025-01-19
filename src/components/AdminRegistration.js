import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminRegistration.css";

function AdminRegistrationForm() {
  const [formData, setFormData] = useState({
    role: "admin", // Default role set to "admin"
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
 const API_ROUTES =
   "https://server-aslpopwc0-saurabhiiitm062s-projects.vercel.app/";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_ROUTES}api/admin-register`,
        formData
      );
      alert("Registration Successful!");

      localStorage.setItem("authToken", response.data.token);
      setFormData({
        role: "admin", // Default role remains "admin"
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError("");
      navigate("/admin-login");
    } catch (error) {
      if (error.response) {
        setError(
          error.response?.data?.message ||
            "Registration failed, please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-registration-form">
      <h2 className="form-title">Admin Registration</h2>

      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        placeholder="Enter your email"
        onChange={handleInputChange}
        className="form-input"
        required
      />

      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        placeholder="Enter your password"
        onChange={handleInputChange}
        className="form-input"
        required
      />

      <label htmlFor="confirmPassword" className="form-label">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        placeholder="Confirm your password"
        onChange={handleInputChange}
        className="form-input"
        required
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="form-button">
        Register
      </button>

      <div className="login-link">
        <p>
          Already have an account?{" "}
          <a href="/admin-login" className="login-link-text">
            Login here
          </a>
        </p>
      </div>
    </form>
  );
}

export default AdminRegistrationForm;
