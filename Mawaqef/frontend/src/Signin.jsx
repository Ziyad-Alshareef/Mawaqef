/*import React from 'react';
import './Sign.css';

const Signin = () => {
    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                <form>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" required />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="signin-image"></div>
        </div>
    );
};

export default Signin;
*/
import React, { useState } from 'react';
import './Sign.css';
import axios from 'axios';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: 'operator' // Default user type
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUserTypeChange = () => {
        setFormData({
            ...formData,
            userType: formData.userType === 'admin' ? 'operator' : 'admin'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signin/', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="input-group switch-group">
                        <label>Sign in as Admin</label>
                        <label className="switch">
                            <input type="checkbox" checked={formData.userType === 'admin'} onChange={handleUserTypeChange} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="signin-image"></div>
        </div>
    );
};

export default Signin;
