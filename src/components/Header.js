import React, { useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import Cookies from 'js-cookie';
import axios from 'axios';

const Header = () => {
  const notificationCount = 2;
  const navigate = useNavigate();
  const loginId = Cookies.get('auth');

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
          Cookies.remove('auth');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        Cookies.remove('auth');
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
    Cookies.remove('auth');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo-container">
          <Link className="fancy-link" to="/">
            <h1 className="fitzoo-logo">Fitzoo</h1>
          </Link>
        </div>
        <nav className="header-nav">
          {loginId ? (
            <>
              {/* <Link to="/visual" className="nav-link">Home</Link> */}
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/equipment" className="nav-link">My Equipment</Link>
              <Link to="/slots" className="nav-link">My Slots</Link>
              <Link to="/gallery" className="nav-link">My Gallery</Link>
              <Link to="/subscription" className="nav-link">My Subscription</Link>
              <Link to="/booking" className="nav-link">My Bookings</Link>
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
              <Link to="/login" className="nav-link btn-login">Login</Link>
              <Link to="/register" className="nav-link btn-register">Register Gym</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
