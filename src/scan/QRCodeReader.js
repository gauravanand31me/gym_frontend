import React, { useState } from 'react';
import Header from '../components/Header';
import ReactScan from '../components/Scanner';
import axios from "axios";
import "./Scanner.css";

const QRCodeReader = () => {
    const [scanResult, setScanResult] = useState(null);
    const [messages, setMessages] = useState([]);

    const handleOnScan = async (result) => {
        if (result) {
            const bookingId = result[0].rawValue;

            try {
                const response = await axios.get(bookingId, {
                    headers: { 'auth': document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/, "$1") }
                });

                setMessages([response.data.message || response.data]);
            } catch (error) {
                const errorMsg = error.response ? error.response.data.message : 'An error occurred';
                setMessages([errorMsg]);
            }

            setScanResult(bookingId);
        }
    };

    const handleNewScan = () => {
        setScanResult(null);
        setMessages([]);
    };

    return (
        <div className="slot-container">
            <Header />
            <ReactScan onScan={handleOnScan} />
            <div className="scan-result">
                {scanResult && <pre>{JSON.stringify(scanResult, null, 2)}</pre>}
                {messages.length > 0 && (
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                )}
            </div>
            <button onClick={handleNewScan} className="new-scan-button">
                New Scan
            </button>
        </div>
    );
};

export default QRCodeReader;
