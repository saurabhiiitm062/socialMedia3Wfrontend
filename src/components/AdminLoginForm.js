import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AdminLoginForm.css";

function AdminLoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_ROUTES =
    "https://server-ap7dimg9h-saurabhiiitm062s-projects.vercel.app/";
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ROUTES}/admin-login`, formData);
      console.log("Login response:", response.data);
      alert("Login Successful!");

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);

      setFormData({ email: "", password: "" });
      setError("");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(
          error.response?.data?.message || "Login failed, please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-login-form">
      <h2 className="form-title">Admin Login</h2>

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

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="form-button">
        Login
      </button>

      <p className="register-link">
        Don't have an account?{" "}
        <Link to="/admin-registration">Register here</Link>
      </p>
    </form>
  );
}

export default AdminLoginForm;
