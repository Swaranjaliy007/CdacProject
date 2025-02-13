

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
// import LOGIN-image from './LOGIN-image.jpg'; // Import the image
import './Login.css'; // Ensure you create and modify this CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", { email, password });
      localStorage.setItem("token", response.data);
      navigate("/dashboard"); // Redirect to children details page on success
    } catch (error) {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <div className="login-container d-flex shadow-lg">
        {/* Left Section - Image */}
        <div className="image-section">
          <img src="./LOGIN-image.jpg" alt="Login" className="LOGIN-image" />
        </div>

        {/* Right Section - Login Form */}
        <div className="login-box p-5">
          {/* Logo Section */}
          <div className="logo-section text-center mb-3">
            <FontAwesomeIcon icon={faCrow} className="logo-icon me-2" />
            <span className="h1 fw-bold">H.O.P.E.</span>
          </div>

          <h3 className="fw-normal text-center mb-4">Log in</h3>

          <form onSubmit={handleLogin} className="login-form">
            {/* Email Input */}
            <div className="form-outline mb-3">
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-outline mb-3">
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <div className="mb-4">
              <button className="btn btn-info btn-lg btn-block w-100" type="submit">
                Login
              </button>
            </div>

           
            <p className="text-center">
              Don't have an account? <a href="/register" className="link-info">Register here</a>
            </p>
          </form>
            <p className="small text-center">
              <Link to={"/forgot"}>ForgotPassword</Link>
            </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
