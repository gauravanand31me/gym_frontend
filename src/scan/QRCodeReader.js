import React, { useState } from 'react';
import Header from '../components/Header';
import ReactScan from '../components/Scanner';
import axios from "axios";
import "./Scanner.css";

const QRCodeReader = () => {
    // State to hold the scanned result and messages
    const [scanResult, setScanResult] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleOnScan = async (result) => {
        // Check if a result is obtained
        if (result) {
            const bookingId = result[0].rawValue; // Assuming this is the booking ID

            try {
                const response = await axios.get(bookingId, {
                    headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
                });
                
                // Set the response messages
                setMessages([response.data]); // Assuming the server response is a message
            } catch (error) {
                // Handle errors and display the error message
                const errorMsg = error.response ? error.response.data.message : 'An error occurred';
                setMessages([errorMsg]);
            }

            // Update the state with the scanned result
            setScanResult(bookingId);
        }
    };

    const handleNewScan = () => {
        // Reset the scan result and messages for a new scan
        setScanResult(null);
        setMessages([]);
    };

    return (
        <div className="slot-container">
            <Header />
            <ReactScan onScan={handleOnScan} />
            <div className="scan-result">
                {/* Display the scanned JSON result here */}
                {scanResult && (
                    <pre>{JSON.stringify(scanResult, null, 2)}</pre> // Pretty-print JSON with indentation
                )}
                {/* Display messages */}
                {messages.length > 0 && (
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                )}
            </div>
            {/* Button for a new scan */}
            <button onClick={handleNewScan} className="new-scan-button">
                New Scan
            </button>
        </div>
    );
};

export default QRCodeReader;
