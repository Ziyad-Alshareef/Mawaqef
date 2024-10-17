import React, { useState } from 'react';
import api from "../api";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [pinSent, setPinSent] = useState(false);
    const [pin, setPin] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);

    const handleSendPin = async () => {
        try {
            const response = await api.post("/api/forgot-password/", { email });
            setMessage(response.data.message);
            setPinSent(true);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword.length<8){
            setMessage("Password must be at least 8 characters long.");
            return;}
        if (!/[a-zA-Z]/.test(newPassword)){
            setMessage("Password must contain at least one letter.");
            return;
        }
        try {
            const response = await api.post('/api/reset-password/', { email, pin, new_password: newPassword });
            setMessage(response.data.message);
            setPasswordChanged(true);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            {!pinSent ? (
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email.toLowerCase()}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleSendPin}>Send PIN</button>
                </div>
            ) : !passwordChanged ? (
                <div>
                    <label>PIN:</label>
                    <input
                        type="text"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </div>
            ) : (
                <p>Password reset successfully!</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
