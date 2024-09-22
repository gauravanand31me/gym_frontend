import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginWithPin.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const LoginWithPin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const loginId = Cookies.get('auth');

  useEffect(() => {
    // Function to verify the token by making an API call
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-token`,
          {},
          {
            headers: {
              'Authorization': loginId,
            },
          }
        );

        // If the token is valid, redirect to the profile page
        if (response.data.message === 'Token is valid') {
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        // Clear any stale token
        Cookies.remove('auth');
      }
    };

    // Call the function if loginId exists
    if (loginId) {
      verifyToken();
    }
  }, [loginId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
        email: loginData.email,
        password: loginData.password,
      });

      const { token } = response.data;

      // Set token in the cookie
      document.cookie = `auth=${token}; path=/;`;

      // Redirect to the profile page after successful login
      navigate('/profile');
    } catch (error) {
      toast.error('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="hero-overlay">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h2 className="text-center mb-4 text-light">Login</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="text-light">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-light">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password"
                      />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-warning w-100 mb-2">
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-light w-100"
                      onClick={() => navigate('/register')}
                    >
                      Register
                    </button>
                  </form>
                  <div className="text-center mt-3">
                    <a href="#forgot-password" className="text-light">
                      Forgot Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginWithPin;
