/* import React from 'react';
import './Sign.css';

const Signup = () => {
    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign Up</h2>
                <form>
                    <div className="input-group">
                        <label>Organization Name</label>
                        <input type="text" required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" required />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input type="number" required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="signin-image"></div>
        </div>
    );
};

export default Signup;
*/
import React, { useState } from 'react';
import './Sign.css';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        organizationName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signup/', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Organization Name</label>
                        <input type="text" name="organizationName" value={formData.organizationName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="signin-image"></div>
        </div>
    );
};

export default Signup;
