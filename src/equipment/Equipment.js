import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EquipmentPage.css';
import Header from '../components/Header';

const EquipmentPage = () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [newEquipment, setNewEquipment] = useState('');
    const [quantity, setQuantity] = useState('');
    const [editing, setEditing] = useState(null);
    const [editName, setEditName] = useState('');
    const [editQuantity, setEditQuantity] = useState('');

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/equipment`, {
                headers: { 'login_id': document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setEquipmentList(response.data);
        } catch (error) {
            console.error('Error fetching equipment:', error);
        }
    };

    const handleAddEquipment = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/equipment`, {
                name: newEquipment,
                quantity: parseInt(quantity),
            }, {
                headers: { 'login_id': document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setNewEquipment('');
            setQuantity('');
            fetchEquipment();
        } catch (error) {
            console.error('Error adding equipment:', error);
        }
    };

    const handleDeleteEquipment = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/equipment/${id}`, {
                headers: { 'login_id': document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            fetchEquipment();
        } catch (error) {
            console.error('Error deleting equipment:', error);
        }
    };

    const handleEditEquipment = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/equipment/${editing}`, {
                name: editName,
                quantity: parseInt(editQuantity),
            }, {
                headers: { 'login_id': document.cookie.replace(/(?:(?:^|.*;\s*)login_id\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setEditing(null);
            setEditName('');
            setEditQuantity('');
            fetchEquipment();
        } catch (error) {
            console.error('Error updating equipment:', error);
        }
    };

    return (
        <div className="equipment-container">
            <Header />
            <h1><i className="fas fa-dumbbell"></i> Equipment List</h1>
            {equipmentList.length === 0 ? (
                <div className="no-equipment">
                    <i className="fas fa-exclamation-circle"></i> No equipment available. Please add some equipment below.
                </div>
            ) : (
                <table className="equipment-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipmentList.map(equip => (
                            <tr key={equip.id}>
                                <td>
                                    {editing === equip.id ? 
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                        /> 
                                        : equip.name}
                                </td>
                                <td>
                                    {editing === equip.id ? 
                                        <input
                                            type="number"
                                            value={editQuantity}
                                            onChange={(e) => setEditQuantity(e.target.value)}
                                        /> 
                                        : equip.quantity}
                                </td>
                                <td>
                                    {editing === equip.id ? (
                                        <button onClick={handleEditEquipment}><i className="fas fa-save"></i> Save</button>
                                    ) : (
                                        <>
                                            <button onClick={() => {
                                                setEditing(equip.id);
                                                setEditName(equip.name);
                                                setEditQuantity(equip.quantity);
                                            }}><i className="fas fa-edit"></i> Edit</button>
                                            <button onClick={() => handleDeleteEquipment(equip.id)}><i className="fas fa-trash"></i> Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="add-equipment-form">
                <h2><i className="fas fa-plus-circle"></i> Add New Equipment</h2>
                <input
                    type="text"
                    placeholder="Equipment Name"
                    value={newEquipment}
                    onChange={(e) => setNewEquipment(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={handleAddEquipment}><i className="fas fa-plus-circle"></i> Add Equipment</button>
            </div>
        </div>
    );
};

export default EquipmentPage;
