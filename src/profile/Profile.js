import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import "./Profile.css";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify

const GymDisplay = () => {
    const [gymData, setGymData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const fetchGymData = async () => {
        try {
            const response = await axios.get( `${process.env.REACT_APP_API_BASE_URL}/api/fetch`, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") } // Replace with your actual JWT token
            });
            setGymData(response.data.gym);
        } catch (error) {
            console.error('Error fetching gym data:', error);
        }
    };
    
    useEffect(() => {
        fetchGymData();
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/update`, modalData, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") } // Replace with your actual JWT token
            });
            setShowEditModal(false);
            // Optionally, refetch the gym data to reflect changes
            toast.success('Gym Updated Successfully'); // Show error message
            await fetchGymData();
        } catch (error) {
            toast.error('Error updating gym data:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="container gym-container">
                <Card className="shadow-lg">
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

                {/* Modal for Editing Gym Details */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Gym Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={modalData.name || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={modalData.description || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="addressLine1"
                                    value={modalData.addressLine1 || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="addressLine2"
                                    value={modalData.addressLine2 || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={modalData.city || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="state"
                                    value={modalData.state || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="country"
                                    value={modalData.country || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pinCode"
                                    value={modalData.pinCode || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.0001"
                                    name="latitude"
                                    value={modalData.latitude || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.0001"
                                    name="longitude"
                                    value={modalData.longitude || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer />
            </div>
        </>
    );
};

export default GymDisplay;
