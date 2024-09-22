import React, { useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Header = () => {
  const notificationCount = 2;
  const navigate = useNavigate();
  const loginId = Cookies.get('login_id');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-token`,
          {},
          {
            headers: {
              Authorization: loginId
            }
          }
        );

        if (response.data.message !== 'Token is valid') {
          Cookies.remove('login_id');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        Cookies.remove('login_id');
        navigate('/login');
      }
    };

    if (loginId) {
      verifyToken();
    } else {
      // navigate('/login');
    }
  }, [loginId, navigate]);

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleLogout = () => {
    Cookies.remove('login_id');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo-container">
          <a className="fancy-link" href="/">
            <h1 className="fitzoo-logo">Fitzoo</h1>
          </a>
        </div>
        <nav className="header-nav">
          {loginId ? (
            <>
              <a href="/visual" className="nav-link">Home</a>
              <a href="/profile" className="nav-link">Profile</a>
              <a href="/equipment" className="nav-link">My Equipment</a>
              <a href="/slots" className="nav-link">My Slots</a>
              <a href="/gallery" className="nav-link">My Gallery</a>
              <a href="/subscription" className="nav-link">My Subscription</a>
              <a href="/booking" className="nav-link">My Bookings</a>
              <div className="notification-container" onClick={handleNotificationClick}>
                <FontAwesomeIcon icon={faBell} className="notification-icon" />
                {notificationCount > 0 && (
                  <span className="notification-badge">{notificationCount}</span>
                )}
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="nav-link btn-login">Login</a>
              <a href="/register" className="nav-link btn-register">Register Gym</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
