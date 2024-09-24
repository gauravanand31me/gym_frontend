import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import MapComponent from '../components/MapComponent'; // Import the new MapComponent
import 'bootstrap/dist/css/bootstrap.min.css';
import './GymImages.css'; // Assuming you have a custom CSS file for additional styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MergedGymPage = () => {
  // State Management
  const [gymData, setGymData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [images, setImages] = useState([]);
  const [showMap, setShowMap] = useState(false); // New state for showing the map

  // Fetch Gym Data
  const fetchGymData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fetch`, {
        headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
      });
      setGymData(response.data.gym);
    } catch (error) {
      console.error('Error fetching gym data:', error);
    }
  };

  // Fetch Gym Images
  const fetchImages = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/gym-images`, {
        headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchGymData();
    fetchImages();
  }, []);

  // Handle Edit Modal Show
  const handleShowEditModal = () => {
    setModalData({
      name: gymData?.name || '',
      description: gymData?.description || '',
      addressLine1: gymData?.addressLine1 || '',
      addressLine2: gymData?.addressLine2 || '',
      city: gymData?.city || '',
      state: gymData?.state || '',
      country: gymData?.country || '',
      pinCode: gymData?.pinCode || '',
      latitude: gymData?.latitude || '',
      longitude: gymData?.longitude || '',
    });
    setShowEditModal(true);
  };

  // Handle Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Save Edited Gym Details
  const handleSave = async () => {
    setShowMap(true); // Show the map when saving
  };

  const handleMapSave = async () => {
    console.log("ModalData is", modalData);
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/update`, modalData, {
        headers: { 
          'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") 
        }
      });
      setShowEditModal(false);
      toast.success('Gym Updated Successfully');
      fetchGymData();
    } catch (error) {
      toast.error('Error updating gym data:', error);
    }
  };
  
  // Handle location selection from the map
  const handleLocationSelect = (location) => {
   
    // Update modalData with the new location
    setModalData((prevData) => {
      const updatedData = {
        ...prevData,
        latitude: location.lat,
        longitude: location.lng,
      };
  
      // Call handleMapSave with the updated data

      return updatedData; // Return the new state for modalData
    });
  

  };

  // Image Upload
  const handleImageUpload = async (event) => {
    const formData = new FormData();
    for (const file of event.target.files) {
      formData.append('images', file);
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/gym-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1"),
        },
      });
      fetchImages();
      toast.success('Images Uploaded Successfully');
    } catch (error) {
      toast.error('Error uploading images:', error);
    }
  };

  // Image Delete
  const handleImageDelete = async (imageId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/gym-images/${imageId}`, {
        headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
      });
      fetchImages();
      toast.success('Image Deleted Successfully');
    } catch (error) {
      toast.error('Error deleting image:', error);
    }
  };

  return (
    <>
      <Header />
      <Container className="merged-gym-page">
        <Row>
          {/* Image Gallery Section */}
          <Col md={6} className="gallery-col">
            <Card className="shadow-lg mb-4">
              <Card.Header className="bg-success text-white">
                <h2>Gym Image Gallery</h2>
              </Card.Header>
              <Card.Body>
                <label className="upload-button mb-3">
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="upload-input"
                  />
                  <span className="btn btn-success">Upload New Images</span>
                </label>
                <div className="gallery">
                  {images.length > 0 ? (
                    images.map((image) => (
                      <div key={image.id} className="gallery-item">
                        <img src={image.imageUrl} alt={`Gym Image ${image.id}`} />
                        <button className="delete-button" onClick={() => handleImageDelete(image.id)}>✖</button>
                      </div>
                    ))
                  ) : (
                    <div className="no-images">No images available. Upload some to get started!</div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Gym Details Section */}
          <Col md={6} className="gym-details-col">
            <Card className="shadow-lg mb-4">
              <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                <h2>{gymData?.name || 'Loading...'}</h2>
                <Button variant="light" onClick={handleShowEditModal}>Modify Details</Button>
              </Card.Header>
              <Card.Body>
                <Card.Title>Gym Description</Card.Title>
                <Card.Text>{gymData?.description}</Card.Text>
                <Card.Title>Gym Location</Card.Title>
                <Card.Text>
                  {gymData?.addressLine1}, {gymData?.addressLine2}<br />
                  {gymData?.city}, {gymData?.state}, {gymData?.country}, {gymData?.pinCode}
                </Card.Text>
                <Card.Title>Coordinates</Card.Title>
                <Card.Text>
                  Latitude: {gymData?.latitude}<br />
                  Longitude: {gymData?.longitude}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

        </Row>
        {/* Modal for Editing Gym Details */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Gym Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {Object.keys(modalData).map((key) => (
                <Form.Group controlId={key} key={key}>
                  <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                  <Form.Control
                    type={key.includes('latitude') || key.includes('longitude') ? 'number' : 'text'}
                    name={key}
                    value={modalData[key]}
                    onChange={handleChange}
                  />
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

        {/* Show Google Map */}
   
        {showMap && (
          <Modal show={showMap} onHide={() => setShowMap(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Select Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <MapComponent onLocationSelect={handleLocationSelect} pinCode={modalData.pinCode}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => handleMapSave()}>Save Changes</Button>
              <Button variant="secondary" onClick={() => setShowMap(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}

        <ToastContainer />
      </Container>
    </>
  );
};

export default MergedGymPage;
