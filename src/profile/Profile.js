import React, { useState } from 'react';
import Joyride from 'react-joyride';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faClock, faImage, faMapMarkerAlt, faBarcode } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

const GymDisplay = () => {
    const navigate = useNavigate();
    const [isTourOpen, setIsTourOpen] = useState(true);

    // Tour steps, each aligned with different components by `data-step` attribute
    const tourSteps = [
        {
            target: '.add-equipment-step',
            content: 'Start by adding equipment details to showcase your gym’s resources.',
            disableBeacon: true
        },
        {
            target: '.add-slots-step',
            content: 'Define available time slots for gym sessions and personal training.',
        },
        {
            target: '.upload-image-step',
            content: 'Upload a quality image of your gym to attract more clients.',
        },
        {
            target: '.update-location-step',
            content: 'Ensure your gym location is easily accessible by updating it here.',
        },
        {
            target: '.start-receiving-orders-step',
            content: 'Start accepting bookings by scanning client QR codes.',
        }
    ];

    // Close tour handler
    const handleTourClose = () => setIsTourOpen(false);

    // Navigation handler
    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <Header />
            {/* Joyride Tour */}
            {/* <Joyride
                steps={tourSteps}
                continuous
                showSkipButton
                run={isTourOpen}
                styles={{
                    options: {
                        zIndex: 1000
                    }
                }}
                callback={(data) => {
                    if (data.status === 'finished' || data.status === 'skipped') {
                        handleTourClose();
                    }
                }}
            /> */}
            <div className="profile-container my-5">
                <h1 className="heading text-center mb-4">
                    Follow These Simple Steps to Complete Your Gym Profile
                </h1>
                <p className="subheading text-center mb-5">
                    Each step helps in showcasing your gym better to potential clients.
                </p>
                
                <div className="row justify-content-center">
                    <div className="col-md-4 mb-4 add-equipment-step">
                        <Card className="step-card shadow">
                            <Card.Body>
                                <FontAwesomeIcon icon={faDumbbell} size="3x" className="icon mb-3" />
                                <Card.Title className="card-title">Add Equipment</Card.Title>
                                <Card.Text className="card-text">
                                    List all the equipment available in your gym to attract customers.
                                </Card.Text>
                                <Button className="card-button" onClick={() => handleNavigate('/equipment')}>Add Equipment</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4 add-slots-step">
                        <Card className="step-card shadow">
                            <Card.Body>
                                <FontAwesomeIcon icon={faClock} size="3x" className="icon mb-3" />
                                <Card.Title className="card-title">Add Slots</Card.Title>
                                <Card.Text className="card-text">
                                    Define time slots for gym sessions, classes, or personal training.
                                </Card.Text>
                                <Button className="card-button" onClick={() => handleNavigate('/slots')}>Add Slots</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4 upload-image-step">
                        <Card className="step-card shadow">
                            <Card.Body>
                                <FontAwesomeIcon icon={faImage} size="3x" className="icon mb-3" />
                                <Card.Title className="card-title">Upload Profile Image</Card.Title>
                                <Card.Text className="card-text">
                                    Upload a high-quality image of your gym to attract more clients.
                                </Card.Text>
                                <Button className="card-button" onClick={() => handleNavigate('/gallery')}>Upload Image</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4 update-location-step">
                        <Card className="step-card shadow">
                            <Card.Body>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" className="icon mb-3" />
                                <Card.Title className="card-title">Update Location</Card.Title>
                                <Card.Text className="card-text">
                                    Ensure your gym is easy to find by adding your exact location.
                                </Card.Text>
                                <Button className="card-button" onClick={() => handleNavigate('/location')}>Update Location</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4 start-receiving-orders-step">
                        <Card className="step-card shadow">
                            <Card.Body>
                                <FontAwesomeIcon icon={faBarcode} size="3x" className="icon mb-3" />
                                <Card.Title className="card-title">Start Receiving Orders</Card.Title>
                                <Card.Text className="card-text">
                                    Start accepting bookings and orders from clients by scanning their QR codes.
                                </Card.Text>
                                <Button className="card-button" onClick={() => handleNavigate('/scan')}>Scan QR Code</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GymDisplay;
