import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Import CSS for custom styles
import Header from '../components/Header';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import MapComponent from '../components/MapComponent'; // Import the MapComponent
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap modal
import Button from 'react-bootstrap/Button'; // Import Bootstrap button

const GymRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    gymName: '',
    gymDescription: '',
    gymLocation: {
      addressLine1: '',
      addressLine2: '',
      city: '', 
      state: '',
      pinCode: '',
      country: 'India', 
    },
    latitude: 0,
    longitude: 0,
  });

  const [showMapModal, setShowMapModal] = useState(false); // State for controlling map modal
  const states = ['Andhra Pradesh', 'Maharashtra', 'Tamil Nadu', 'West Bengal', 'Karnataka']; // Add Indian states
  const navigate = useNavigate(); 

  // Open map modal when "Set Location" is clicked
  const handleShowMapModal = () => setShowMapModal(true);
  const handleCloseMapModal = () => setShowMapModal(false);

  // Get the location selected from the map
  const handleLocationSelect = ({ lat, lng }) => {
    setFormData({ ...formData, latitude: lat, longitude: lng });
    handleCloseMapModal(); // Close modal after selecting the location
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGymLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, gymLocation: { ...formData.gymLocation, [name]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, gymName, gymDescription, gymLocation, latitude, longitude } = formData;

    const registrationData = {
      email,
      password,
      name: gymName,
      description: gymDescription,
      addressLine1: gymLocation.addressLine1,
      addressLine2: gymLocation.addressLine2,
      pinCode: gymLocation.pinCode,
      city: gymLocation.city,
      state: gymLocation.state,
      country: gymLocation.country,
      latitude,
      longitude,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, registrationData);
      
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        toast.error(response.data.error);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Gym registration error:', error);
      toast.error('An error occurred while registering the gym.');
    }
  };

  return (
    <div className="gym-registration-container">
      <Header />
      <div className="container registration-card shadow mt-5">
        <div className="card-body">
          <h2 className="text-center mb-4">Gym Registration</h2>

          <div className="form-section">
            <h4>Basic Information</h4>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Gym Name</label>
              <input
                type="text"
                className="form-control"
                name="gymName"
                value={formData.gymName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Gym Description</label>
              <textarea
                className="form-control"
                name="gymDescription"
                rows="3"
                value={formData.gymDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <h4>Gym Location</h4>
            <div className="form-group mb-3">
              <label>Address Line 1</label>
              <input
                type="text"
                className="form-control"
                name="addressLine1"
                value={formData.gymLocation.addressLine1}
                onChange={handleGymLocationChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Pin Code</label>
              <input
                type="text"
                className="form-control"
                name="pinCode"
                value={formData.gymLocation.pinCode}
                onChange={handleGymLocationChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.gymLocation.city}
                onChange={handleGymLocationChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>State</label>
              <select
                className="form-control"
                name="state"
                value={formData.gymLocation.state}
                onChange={handleGymLocationChange}
                required
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" className="btn btn-secondary mb-3" onClick={handleShowMapModal}>
              Set Location on Map
            </button>

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Register Gym
            </button>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      <Modal show={showMapModal} onHide={handleCloseMapModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Gym Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MapComponent onLocationSelect={handleLocationSelect} pinCode={formData.gymLocation.pinCode} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMapModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </div>
  );
};

export default GymRegistration;
