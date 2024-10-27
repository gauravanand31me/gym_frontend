import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EquipmentPage.css';
import Header from '../components/Header';
import EquipmentSelection from '../components/EquipmentSelection';

const EquipmentPage = () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
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
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setEquipmentList(response.data);
        } catch (error) {
            console.error('Error fetching equipment:', error);
        }
    };

    const handleAddEquipment = async () => {
        if (!selectedEquipment) return;
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/equipment`, {
                name: selectedEquipment.equipment_name,
                quantity: parseInt(quantity),
            }, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setSelectedEquipment(null);
            setQuantity('');
            fetchEquipment();
        } catch (error) {
            console.error('Error adding equipment:', error);
        }
    };

    const handleDeleteEquipment = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/equipment/${id}`, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
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
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
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
            <div className="equipment-content">
                <h1><i className="fas fa-dumbbell"></i> Equipment Management</h1>

                {equipmentList?.length === 0 ? (
                    <div className="no-equipment">
                        <i className="fas fa-exclamation-circle"></i> No equipment available. Please add some equipment below.
                    </div>
                ) : (
                    <table className="equipment-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentList && equipmentList?.map(equip => (
                                <tr key={equip.id}>
                                    <td>
                                        <div
                                            className="equipment-icon"
                                            dangerouslySetInnerHTML={{ __html: equip.icon_svg }}
                                        />
                                    </td>
                                    <td>
                                        {editing === equip.id ? (
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />
                                        ) : (
                                            equip.name
                                        )}
                                    </td>
                                    <td>
                                        {editing === equip.id ? (
                                            <input
                                                type="number"
                                                value={editQuantity}
                                                onChange={(e) => setEditQuantity(e.target.value)}
                                            />
                                        ) : (
                                            equip.quantity
                                        )}
                                    </td>
                                    <td>
                                        {editing === equip.id ? (
                                            <button className="btn btn-save" onClick={handleEditEquipment}>
                                                <i className="fas fa-save"></i> Save
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-edit"
                                                    onClick={() => {
                                                        setEditing(equip.id);
                                                        setEditName(equip.name);
                                                        setEditQuantity(equip.quantity);
                                                    }}
                                                >
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button className="btn btn-delete" onClick={() => handleDeleteEquipment(equip.id)}>
                                                    <i className="fas fa-trash"></i> Delete
                                                </button>
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
                    {selectedEquipment && (
                        <div className="selected-equipment">
                            <div
                                className="selected-icon"
                                dangerouslySetInnerHTML={{ __html: selectedEquipment.icon_svg }}
                            />
                            <span>Select a new equipment from below, enter quantity and click Add Equipment</span>
                        </div>
                    )}
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button
                        className="btn btn-add"
                        onClick={handleAddEquipment}
                        disabled={!selectedEquipment || !quantity}
                    >
                        <i className="fas fa-plus-circle"></i> Add Equipment
                    </button>
                    <EquipmentSelection onSelect={setSelectedEquipment} />
                    
                </div>
            </div>
        </div>
    );
};

export default EquipmentPage;
