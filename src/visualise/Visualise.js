import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './Visualise.css'; // Custom CSS for styling
import Header from '../components/Header';

const HomePage = () => {
  const [gymData, setGymData] = useState(null);

  useEffect(() => {
    fetchGymData();
  }, []);

  const fetchGymData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fetch`, { headers: { 'login_id': document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") } });
      setGymData(response.data);
    } catch (error) {
      console.error('Error fetching gym data:', error);
    }
  };

  // Image slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true
  };

  return (
    <>
      <Header />
      <div className="homepage-container">
        {gymData ? (
          <>
            {/* Header Section with Background Image and Gradient Overlay */}
            <header className="headers" style={{ backgroundImage: `url(${gymData.images[0].imageUrl})` }}>
              <div className="headers-overlay">
                <h1 className="gym-name">{gymData.gym.name}</h1>
                <p className="gym-description">{gymData.gym.description}</p>
                {/* Modify Link for Gym Info */}
                <a href="/profile" className="modify-link">Modify</a>
              </div>
            </header>

            <div className="address-section card">
              <h2>Address</h2>
              <p>{gymData.gym.addressLine1}</p>
              <p>{gymData.gym.addressLine2}</p>
              <p>{`${gymData.gym.city}, ${gymData.gym.state}, ${gymData.gym.country} - ${gymData.gym.pinCode}`}</p>
              {/* Modify Link for Address */}
              <a href="/profile" className="modify-link">Modify</a>
            </div>

            <div className="slider-container">
              <Slider {...sliderSettings}>
                {gymData.images.map((image) => (
                  <div key={image.id} className="image-slide">
                    <img src={image.imageUrl} alt="Gym" className="gym-image" />
                  </div>
                ))}
              </Slider>
              {/* Modify Link for Images */}
              <a href="/gallery" className="modify-link">Modify</a>
            </div>

            <div className="details-section">
              <div className="equipment-section card">
                <h2>Available Equipment</h2>
                <ul>
                  {gymData.equipment.map((item) => (
                    <li key={item.id}>
                      {item.name} <span className="quantity">({item.quantity})</span>
                    </li>
                  ))}
                </ul>
                {/* Modify Link for Equipment */}
                <a href="/equipment" className="modify-link">Modify</a>
              </div>

              <div className="slots-section card">
                <h2>Available Slots</h2>
                {gymData.slots.map((slot) => (
                  <div key={slot.id} className="slot-details">
                    <p><strong>Capacity:</strong> {slot.capacity}</p>
                    <p><strong>Price:</strong> ${slot.price}</p>
                    <p><strong>Start Time:</strong> {slot.startTime}</p>
                    <p><strong>Time Period:</strong> {slot.timePeriod} hours</p>
                  </div>
                ))}
                {/* Modify Link for Slots */}
                <a href="/slots" className="modify-link">Modify</a>
              </div>
            </div>

            <div className="subscription-section card">
              <h2>Subscription Plans</h2>
              {gymData.subscriptions.map((sub) => (
                <div key={sub.id} className="subscription-details">
                  <div className="pricing-card">
                    <div className="pricing-option">
                      <p><strong>Daily:</strong></p>
                      <p className="price">${sub.daily}</p>
                    </div>
                    <div className="pricing-option">
                      <p><strong>Monthly:</strong></p>
                      <p className="price">${sub.monthly}</p>
                    </div>
                    <div className="pricing-option">
                      <p><strong>Yearly:</strong></p>
                      <p className="price">${sub.yearly}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Modify Link for Subscription Plans */}
              <a href="/subscription" className="modify-link">Modify</a>
            </div>
          </>
        ) : (
          <div className="loading">
            <p>Loading gym details...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
