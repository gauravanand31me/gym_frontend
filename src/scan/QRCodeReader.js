import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReactScan from '../components/Scanner';

const QRCodeReader = () => {
    const handleOnScan = (result) => {
        // Assuming the result object has a property `text` that contains the scanned value
        if (result) {
            alert("Result is: " + result.text); // Adjust this property based on your QR scanner's output
        }
    }

    return (
        <div className="slot-container">
            <Header />
            <ReactScan onScan={handleOnScan}/>
        </div>
    );
}

export default QRCodeReader;
