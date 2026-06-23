import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import API from "../services/api";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("userId", res.data.userId);

      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo-section">
          <FaCity className="city-logo" />

          <h1>CivicGrid</h1>

          <h3>Real Time Civic Compliance System</h3>

          <p>
            Connecting Citizens & Civic Services
          </p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>

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
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Register Here</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;