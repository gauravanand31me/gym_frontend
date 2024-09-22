import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

const BookingPage = ({ slotsData }) => {
  // Sample data for demonstration purposes
  const defaultSlotsData = [
    {
      slotId: 1,
      slotTime: '06:00 AM - 08:00 AM',
      capacity: 10,
      bookings: [
        { bookingId: 101, userName: 'John Doe', price: 20, paid: true },
        { bookingId: 102, userName: 'Jane Smith', price: 20, paid: false },
      ],
    },
    {
      slotId: 2,
      slotTime: '08:00 AM - 10:00 AM',
      capacity: 12,
      bookings: [
        { bookingId: 103, userName: 'Michael Johnson', price: 25, paid: true },
        { bookingId: 104, userName: 'Emily White', price: 25, paid: true },
      ],
    },
    {
      slotId: 3,
      slotTime: '10:00 AM - 12:00 PM',
      capacity: 8,
      bookings: [
        { bookingId: 105, userName: 'Sophia Brown', price: 30, paid: false },
        { bookingId: 106, userName: 'Liam Wilson', price: 30, paid: true },
      ],
    },
  ];

  const slots = slotsData || defaultSlotsData;
  const [selectedSlot, setSelectedSlot] = useState('all');
  const [bookings, setBookings] = useState(slots.flatMap(slot => slot.bookings));

  // Function to filter bookings based on selected slot
  const getFilteredBookings = () => {
    if (selectedSlot === 'all') {
      return slots.flatMap((slot) => slot.bookings.map((booking) => ({ ...booking, slotTime: slot.slotTime })));
    } else {
      const slot = slots.find((slot) => slot.slotId === parseInt(selectedSlot));
      return slot ? slot.bookings.map((booking) => ({ ...booking, slotTime: slot.slotTime })) : [];
    }
  };

  const filteredBookings = getFilteredBookings();

  // Cancel booking logic
  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingId);
    setBookings(updatedBookings);
  };

  return (
    <>
      <Header />
      <div className="container gym-display-container" style={styles.background}>
        <div className="card shadow-lg">
          <div className="card-header bg-info text-white">
            <h2 className="text-center">Booking Management</h2>
          </div>
          <div className="card-body">
            <h5 className="card-title">View Bookings</h5>

            <div className="mb-3">
              <label htmlFor="slotSelect" className="form-label">Select Slot Timing</label>
              <select
                className="form-select"
                id="slotSelect"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="all">All Slots</option>
                {slots.map((slot) => (
                  <option key={slot.slotId} value={slot.slotId}>
                    {slot.slotTime}
                  </option>
                ))}
              </select>
            </div>

            {filteredBookings.length > 0 ? (
              <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Slot Timing</th>
                    <th scope="col">Price</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Cancel Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr key={index}>
                      <th scope="row">{booking.bookingId}</th>
                      <td>{booking.userName}</td>
                      <td>{booking.slotTime}</td>
                      <td>${booking.price}</td>
                      <td>
                        {booking.paid ? (
                          <span className="badge bg-success">Paid</span>
                        ) : (
                          <span className="badge bg-danger">Not Paid</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleCancelBooking(booking.bookingId)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No bookings found for this slot.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// CSS-in-JS styles for the background
const styles = {
  background: {
    marginTop: '100px',
    padding: '20px',
    backgroundColor: '#f8f9fa', // Light background color
    borderRadius: '10px',
  },
};

export default BookingPage;
