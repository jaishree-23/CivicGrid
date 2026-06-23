import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import API from "../services/api";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setSuccess("Registration Successful");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo-section">
          <FaCity className="city-logo" />

          <h1>CivicGrid</h1>

          <h3>Real Time Civic Compliance System</h3>

          <p>Create Your Account</p>
        </div>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Register
          </button>

        </form>

        <p className="register-text">
          Already have an account?{" "}
          <Link to="/">Login Here</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;