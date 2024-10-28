import React, { useEffect, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Import useLocation
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from "../img/White on transparent.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const loginId = Cookies.get('auth');
  
  // Get current location to track active tab
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname); // Initialize with the current path

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
    }
  }, [loginId, navigate]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    Cookies.remove('auth');
    navigate('/login');
  };

  // Function to handle tab clicks
  const handleTabClick = (path) => {
    setActiveTab(path); // Set the clicked tab as active
    navigate(path); // Navigate to the clicked tab
  };

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo-container">
          <Link className="fancy-link" to="/">
            <img src={logo} height="50" width="100" alt="Logo" />
          </Link>
        </div>
  
        <button className="menu-button" onClick={handleMenuToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
  
        {/* Desktop Navigation */}
        <nav className="header-nav-desktop">
          {loginId ? (
            <>
              <Link to="/profile" className={`nav-link ${activeTab === '/profile' ? 'active' : ''}`} onClick={() => handleTabClick('/profile')}>Profile</Link>
              <Link to="/equipment" className={`nav-link ${activeTab === '/equipment' ? 'active' : ''}`} onClick={() => handleTabClick('/equipment')}>My Equipment</Link>
              <Link to="/slots" className={`nav-link ${activeTab === '/slots' ? 'active' : ''}`} onClick={() => handleTabClick('/slots')}>My Slots</Link>
              <Link to="/gallery" className={`nav-link ${activeTab === '/gallery' ? 'active' : ''}`} onClick={() => handleTabClick('/gallery')}>My Gallery</Link>
              <Link to="/subscription" className={`nav-link ${activeTab === '/subscription' ? 'active' : ''}`} onClick={() => handleTabClick('/subscription')}>My Subscription</Link>
              <Link to="/booking" className={`nav-link ${activeTab === '/booking' ? 'active' : ''}`} onClick={() => handleTabClick('/booking')}>My Bookings</Link>
              <button className="logout-button" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`nav-link btn-login ${activeTab === '/login' ? 'active' : ''}`} onClick={() => handleTabClick('/login')}>Login</Link>
              <Link to="/register" className={`nav-link btn-register ${activeTab === '/register' ? 'active' : ''}`} onClick={() => handleTabClick('/register')}>Register Gym</Link>
            </>
          )}
        </nav>
  
        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="header-nav-mobile">
            {loginId ? (
              <>
                <Link to="/profile" className={`nav-link ${activeTab === '/profile' ? 'active' : ''}`} onClick={() => handleTabClick('/profile')}>Profile</Link>
                <Link to="/equipment" className={`nav-link ${activeTab === '/equipment' ? 'active' : ''}`} onClick={() => handleTabClick('/equipment')}>My Equipment</Link>
                <Link to="/slots" className={`nav-link ${activeTab === '/slots' ? 'active' : ''}`} onClick={() => handleTabClick('/slots')}>My Slots</Link>
                <Link to="/gallery" className={`nav-link ${activeTab === '/gallery' ? 'active' : ''}`} onClick={() => handleTabClick('/gallery')}>My Gallery</Link>
                <Link to="/subscription" className={`nav-link ${activeTab === '/subscription' ? 'active' : ''}`} onClick={() => handleTabClick('/subscription')}>My Subscription</Link>
                <Link to="/booking" className={`nav-link ${activeTab === '/booking' ? 'active' : ''}`} onClick={() => handleTabClick('/booking')}>My Bookings</Link>
                <button className="logout-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`nav-link btn-login ${activeTab === '/login' ? 'active' : ''}`} onClick={() => handleTabClick('/login')}>Login</Link>
                <Link to="/register" className={`nav-link btn-register ${activeTab === '/register' ? 'active' : ''}`} onClick={() => handleTabClick('/register')}>Register Gym</Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
