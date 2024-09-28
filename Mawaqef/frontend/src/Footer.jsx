import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Mawaqef is a parking management system designed to make parking easier and more efficient.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/organizations">Organizations</a></li>
                        <li><a href="/signin">Sign In</a></li>
                        <li><a href="/signup">Sign Up</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: </p>
                    <p>Phone: </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Mawaqef. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
