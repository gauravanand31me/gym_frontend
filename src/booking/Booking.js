import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import axios from 'axios';

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlotTime, setSelectedSlotTime] = useState('all');

    const getAllBooking = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/booking`, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setBookings(response.data.Booking);
            setFilteredBookings(response.data.Booking); // Set the initial filtered bookings
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        getAllBooking();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [selectedDate, selectedSlotTime, bookings]);

    const filterBookings = () => {
        let filtered = bookings;

        if (selectedDate) {
            filtered = filtered.filter(booking => booking.bookingDate === selectedDate);
        }

        if (selectedSlotTime !== 'all') {
            filtered = filtered.filter(booking => booking.slotStartTime === selectedSlotTime);
        }

        setFilteredBookings(filtered);
    };

    const handleCancelBooking = (bookingId) => {
        const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingId);
        setBookings(updatedBookings);
        setFilteredBookings(updatedBookings); // Update filtered bookings
    };

    const getUniqueSlotTimes = () => {
        const uniqueSlotTimes = [...new Set(bookings.map(booking => booking.slotStartTime))];
        return uniqueSlotTimes;
    };

    return (
        <>
            <Header />
            <div className="container gym-display-container">
                <div className="card shadow-lg">
                <div className="card-header bg-info text-white" style={{ marginTop: '40px' }}>
                <h2 className="text-center">Booking Management</h2>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">View Bookings</h5>

                        <div className="mb-3">
                            <label htmlFor="dateSelect" className="form-label">Select Booking Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateSelect"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="slotSelect" className="form-label">Select Slot Timing</label>
                            <select
                                className="form-select"
                                id="slotSelect"
                                value={selectedSlotTime}
                                onChange={(e) => setSelectedSlotTime(e.target.value)}
                            >
                                <option value="all">All Slots</option>
                                {getUniqueSlotTimes().map((slotTime, index) => (
                                    <option key={index} value={slotTime}>
                                        {slotTime}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {filteredBookings.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">Booking ID</th>
                                            <th scope="col">User Full Name</th>
                                            <th scope="col">Booking Date</th>
                                            <th scope="col">Visited</th>
                                            <th scope="col">Gym Name</th>
                                            <th scope="col">Gym Rating</th>
                                            <th scope="col">Slot Start Time</th>
                                            <th scope="col">Subscription Price</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Invited Buddy Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredBookings.map((booking, index) => (
                                            <tr key={index}>
                                                <th scope="row">{booking.bookingId}</th>
                                                <td>{booking.userFullName}</td>
                                                <td>{new Date(booking.bookingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                <td>
                                                    {booking.visited ? (
                                                        <span className="badge bg-success">Visited</span>
                                                    ) : (
                                                        <span className="badge bg-danger">Not Visited</span>
                                                    )}
                                                </td>
                                                <td>{booking.gymName}</td>
                                                <td>{booking.gymRating}</td>
                                                <td>{new Date(`${booking.bookingDate}${booking.slotStartTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                                                <td>INR {booking.subscriptionPrice}</td>
                                                <td>{new Date(booking.create).toLocaleString()}</td>
                                                <td>{booking.invitedBuddyCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center">No bookings found for the selected criteria.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingPage;
