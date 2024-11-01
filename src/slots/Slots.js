import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Slots.css';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const SlotPage = () => {
    const [slotList, setSlotList] = useState([]);
    const [newSlot, setNewSlot] = useState({
        startTime: '',
        capacity: '',
        price: '',
        timePeriod: '1',
    });

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/slots`, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setSlotList(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleAddSlot = async () => {

        try {
            const formattedSlot = {
                ...newSlot,
                startTime: newSlot.startTime // This is now formatted by selecting from the dropdown
            };
      
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/slots`, formattedSlot, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setNewSlot({ startTime: '', capacity: '', price: '', timePeriod: '' });
            fetchSlots();
        } catch (error) {
            console.error('Error adding slot:', error);
        }
    };

    const handleDeleteSlot = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/slots/${id}`, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            fetchSlots();
        } catch (error) {
            console.error('Error deleting slot:', error);
        }
    };

    // Define available hourly slots
    const hourlySlots = Array.from({ length: 24 }, (_, i) => {
        const hour = i.toString().padStart(2, '0');
        return `${hour}:00`;
    });

    return (
        <div className="slot-container">
            <Header />
            <h1>
                <FontAwesomeIcon icon={faClock} /> Slot Management
            </h1>

            <div className="add-slot-form">
                <h2>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add New Slot
                </h2>
                <div className="form-fields">
                    <select
                        value={newSlot.startTime}
                        onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    >
                        <option value="" disabled>Select Start Time</option>
                        {hourlySlots.map((hour) => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Capacity"
                        value={newSlot.capacity}
                        onChange={(e) => setNewSlot({ ...newSlot, capacity: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newSlot.price}
                        onChange={(e) => setNewSlot({ ...newSlot, price: e.target.value })}
                    />
                   
                </div>
                <button className="add-button" onClick={handleAddSlot}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add Slot
                </button>
            </div>
            <div className="slot-card">
                {slotList?.length === 0 ? (
                    <div className="no-slot">
                        <i className="fas fa-exclamation-circle"></i> No slots available. Please add some slots below.
                    </div>
                ) : (
                    <table className="slot-table">
                        <thead>
                            <tr>
                                <th>Start Time</th>
                                {/* <th>Capacity</th>*/}
                                <th>Price</th>
                                 {/*<th>Time Period (hours)</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slotList?.map(slot => (
                                <tr key={slot.id}>
                                    <td>{slot.startTime}</td>
                                    {/* <td>
                                        <span data-tag="slot-capacity">{slot.capacity}</span>
                                    </td> */}
                                    <td>
                                        <span data-tag="slot-price">INR {slot.price}</span>
                                    </td>
                                    { /* <td>
                                        <span data-tag="slot-time-period">{slot.timePeriod}</span>
                                    </td> */}
                                    <td>
                                        <button className="delete-buttons" onClick={() => handleDeleteSlot(slot.id)}>
                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SlotPage;
