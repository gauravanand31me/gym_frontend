import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReactScan from '../components/Scanner';

const QRCodeReader = () => {
    const handleOnScan = (result) => {
        alert("Result is"+result);
    }

    return (
        <div className="slot-container">
            <Header />
            <ReactScan onScan={handleOnScan}/>
        </div>
    )

}

export default QRCodeReader;