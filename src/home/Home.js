import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import DumbellImage from "../img/dumbbells-floor-gym-ai-generative.jpg";

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay d-flex align-items-center">
                    <div className="container text-center text-white">
                        <h1 className="display-4">Welcome to Gym Management</h1>
                        <p className="lead">Grow your business with us! Manage your gym, bookings, and customers effortlessly.</p>
                        <div className="mt-4">
                            <Link to="/login" className="btn btn-primary btn-lg mx-2">Login</Link>
                            <Link to="/register" className="btn btn-outline-light btn-lg mx-2">Register Gym</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marketing Section */}
            <div className="marketing-section bg-dark text-white py-5">
                <div className="container text-center">
                    <h2 className="display-4 font-weight-bold mb-3">GROW YOUR GYM BUSINESS <span className="text-warning">10x</span></h2>
                    <p className="lead mb-4">Reach out to 100,000+ gym enthusiasts using our platform.</p>
                    <p className="lead mb-4">Advertise your gym <span className="text-warning">for free</span></p>
                    <Link to="/register" className="btn btn-warning btn-lg shadow-lg mt-4">Advertise Now</Link>
                </div>
            </div>

            {/* Why Gym is Important Section */}
            <div className="container my-5">
                <h2 className="text-center mb-5">Why is Gym Important?</h2>
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <img src={DumbellImage} alt="Gym Benefits" className="img-fluid rounded shadow-lg" />
                    </div>
                    <div className="col-md-6">
                        <div className="mb-4">
                            <h3 className="text-primary">Physical Fitness</h3>
                            <p>Gym helps you build a healthier body, improve endurance, and strengthen muscles. It's a gateway to better physical and mental well-being.</p>
                        </div>
                        <div>
                            <h3 className="text-primary">Mental Wellness</h3>
                            <p>Regular workouts are known to reduce stress, improve mood, and promote overall mental health.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits of Using Our Website Section */}
            <div className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-5">Benefits of Using Our Website</h2>
                    <div className="row">
                        <div className="col-md-4 text-center mb-4 mb-md-0">
                            <div className="card shadow-lg border-light benefit-card">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Easy Management</h5>
                                    <p className="card-text">Manage your gym, slots, and bookings easily with our intuitive interface.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center mb-4 mb-md-0">
                            <div className="card shadow-lg border-light benefit-card">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Streamlined Booking</h5>
                                    <p className="card-text">Let users book gym slots effortlessly, reducing no-shows and maximizing attendance.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="card shadow-lg border-light benefit-card">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Increase Revenue</h5>
                                    <p className="card-text">Increase your gym's profitability by optimizing slot capacity and customer satisfaction.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grow Your Business Section */}
            <div className="container my-5">
                <h2 className="text-center mb-5">Grow Your Business with Us!</h2>
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h3 className="text-primary">Expand Your Reach</h3>
                        <p>With our platform, you can attract more members, offer online booking, and market your gym to a wider audience.</p>
                    </div>
                    <div className="col-md-6">
                        <img src={DumbellImage} alt="Grow Your Business" className="img-fluid rounded shadow-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
