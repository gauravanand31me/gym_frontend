import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EquipmentSelection.css';

const EquipmentSelection = ({ onSelect }) => {
    const [equipmentOptions, setEquipmentOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEquipmentOptions();
    }, []);

    const fetchEquipmentOptions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/equipments/list`, 
                {headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }});
            console.log("Response Data is", response.data);
            setEquipmentOptions(response.data);
        } catch (error) {
            console.error('Error fetching equipment options:', error);
        }
    };

    const handleSelect = (equipment) => {
        console.log("selected equipment", equipment);
        onSelect(equipment);
    };

    const filteredEquipment = equipmentOptions.filter(equipment =>
        equipment.equipment_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="equipment-selection-container">
            <h2>Select Equipment</h2>
            <input
                type="text"
                placeholder="Search Equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="equipment-search"
            />
            <div className="equipment-grid">
                {filteredEquipment.length > 0 ? (
                    filteredEquipment.map(equipment => (
                        <div key={equipment.equipment_id} className="equipment-item" onClick={() => handleSelect(equipment)}>
                            <div dangerouslySetInnerHTML={{ __html: equipment.equipment_icon_svg }} className="equipment-icon" />
                            <div className="equipment-name">{equipment.equipment_name}</div>
                            <div className="equipment-description">{equipment.equipment_description}</div>
                        </div>
                    ))
                ) : (
                    <div className="no-equipment-found">
                        <i className="fas fa-exclamation-circle"></i> No equipment found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EquipmentSelection;
