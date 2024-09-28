import React from 'react';
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
