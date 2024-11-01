import React, { useState } from 'react';
import Header from '../components/Header';
import ReactScan from '../components/Scanner';
import axios from "axios";

const QRCodeReader = () => {
    // State to hold the scanned result
    const [scanResult, setScanResult] = useState(null);

    const handleOnScan = async (result) => {
        // Assuming result is the whole JSON object from the scanner
        if (result) {
            // Update the state with the scanned result
            setScanResult(result[0].rawValue); // Store the entire JSON object
            const response = await axios.get(result[0].rawValue, {
                headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
            });
            setScanResult(response.data);
        }
    };

    return (
        <div className="slot-container">
            <Header />
            <ReactScan onScan={handleOnScan}/>
            <div className="scan-result">
                {/* Display the scanned JSON result here */}
                {scanResult && (
                    <pre>{JSON.stringify(scanResult, null, 2)}</pre> // Pretty-print JSON with indentation
                )}
            </div>
        </div>
    );
}

export default QRCodeReader;
