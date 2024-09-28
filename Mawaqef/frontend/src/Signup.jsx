import React from 'react';
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
