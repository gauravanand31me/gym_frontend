import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReactScan from '../components/Scanner';

const QRCodeReader = () => {
    return (
        <div className="slot-container">
            <Header />
            <ReactScan />
        </div>
    )

}

export default QRCodeReader;