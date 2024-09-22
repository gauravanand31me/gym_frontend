import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GymRegister from './register/Register';
import Login from './login/Login';
import GymDisplay from './profile/Profile';
import BookingPage from './booking/Booking';
import HomePage from './home/Home';
import Dashboard from './visualise/Visualise';
import Notifications from './notification/Notification';
import EquipmentPage from './equipment/Equipment';
import SlotPage from './slots/Slots';
import GymImages from './gymImages/GymImages';
import MySubscriptionPage from './subscription/MySubscription';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<GymRegister />} />
                <Route path="/profile" element={<GymDisplay />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/visual" element={<Dashboard />} />
                <Route path="/equipment" element={<EquipmentPage />} />
                <Route path="/slots" element={<SlotPage />} /> 
                <Route path="/gallery" element={<GymImages />} /> 
                <Route path="/subscription" element={<MySubscriptionPage />} /> 
                <Route path="/notifications" element={<Notifications />} /> {/* Add the notifications route */}
            </Routes>
        </Router>
    );
}

export default App;
