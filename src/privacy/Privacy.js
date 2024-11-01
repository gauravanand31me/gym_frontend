// PrivacyPolicy.js
import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Privacy.css';

const PrivacyPolicy = () => {
    return (
        <Container className="privacy-policy white-bg-container">
            <h1 className="text-center my-4">Privacy Policy</h1>
        

            <h2>1. Introduction</h2>
            <p>
                Welcome to Yupluck! We are committed to protecting your privacy and ensuring
                the security of any personal information you provide. This Privacy Policy outlines the types
                of information we collect and how it is used, especially regarding the use of camera access.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
                <li><strong>Personal Information:</strong> Such as name, email address, phone number, etc.</li>
                <li><strong>Usage Data:</strong> Information on how you interact with the app.</li>
                <li><strong>Camera Access:</strong> If you grant permission, we may access your device's camera to provide relevant app features.</li>
            </ul>

            <h2>3. Camera Access and Usage</h2>
            <p>
                Our app may request access to your device's camera for certain features. This access will
                only be used for the following purposes:
            </p>
            <ul>
                <li>To scan QR codes, upload profile pictures, or use other camera-dependent features.</li>
                <li>To enhance the user experience by enabling in-app functionality that relies on camera access.</li>
            </ul>
            <p>
                <strong>Note:</strong> We do not store any images or video from your camera unless explicitly
                stated and only with your consent.
            </p>

            <h2>4. How We Use Your Information</h2>
            <p>
                We use the information we collect to provide, maintain, and improve our services, as well as to
                protect users. We do not sell your personal information to third parties.
            </p>

            <h2>5. Data Security</h2>
            <p>
                We take reasonable measures to protect your information from unauthorized access, but please
                remember that no method of transmission over the Internet or electronic storage is completely secure.
            </p>

            <h2>6. Your Choices</h2>
            <p>
                You can choose to disable camera access or revoke permissions at any time in your device settings.
                This may impact some features of the app, but you will still be able to use the core functions.
            </p>

            <h2>7. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:contact@yupluck.com">contact@yupluck.com</a>.
            </p>

          
        </Container>
    );
};

export default PrivacyPolicy;
