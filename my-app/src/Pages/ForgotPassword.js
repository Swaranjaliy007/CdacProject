import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!phoneNumber) {
            setMessage('Phone number is required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/user/forgot-password', { // Your send OTP endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }), // Send phone number
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error sending OTP.');
            }

            setMessage('OTP sent successfully. Please enter it below.');
            setShowOtpInput(true);
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!otp) {
            setMessage('OTP is required.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/user/verify-otp', { // Your verify OTP endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp }), // Send phone number and OTP
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid OTP.');
            }

            setShowOtpInput(false); // Hide the OTP input
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!newPassword || !confirmPassword) {
            setMessage('New password and confirm password are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/user/reset-password', { // Your reset password endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, newPassword }), // Send phone number and new password
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error resetting password.');
            }

            setMessage('Password reset successfully. You can now login.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Reset Password</h2>
                {message && <p className={message.startsWith("Password") ? "success-message" : "error-message"}>{message}</p>}

                {!showOtpInput ? (
                    <form onSubmit={handleSendOtp}>
                        <div className="input-group">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="tel" // Use tel input type for phone numbers
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Send OTP</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="input-group">
                            <label htmlFor="otp">OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Verify OTP</button>
                    </form>
                )}

                <form onSubmit={handleResetPassword}>
                    <div className="input-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>

            </div>
        </div>
    );
};

export default ForgotPassword;