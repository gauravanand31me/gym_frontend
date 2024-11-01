import React, { useEffect, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt, faBars, faQrcode } from '@fortawesome/free-solid-svg-icons'; // Import the scan icon
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from "../img/logo3.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const loginId = Cookies.get('auth');
  
  // Get current location to track active tab
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

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

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo-container">
          <Link className="fancy-link" to="/">
            <img src={logo} height="50" width="100" alt="Logo" />
          </Link>
          
        </div>

        {loginId && <button className="nav-link" onClick={() => handleTabClick('/scan')}>
                  <FontAwesomeIcon icon={faQrcode} />
               
        </button> }
        
  
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
              <Link to="/scan" className={`nav-link ${activeTab === '/scan' ? 'active' : ''}`} onClick={() => handleTabClick('/scan')}>Scan</Link>
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
