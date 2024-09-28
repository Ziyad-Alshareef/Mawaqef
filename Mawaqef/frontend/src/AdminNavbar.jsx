import React from 'react';
import './App.css'; // Assuming the styles are in App.css or index.css

function AdminNavbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="logo">
                    <a href="/admin">
                        <img src="./public/logo.png" alt="Mawaqef Logo" className="logo-image" />
                    </a>
                </span>
            </div>
            <div className="navbar-right">
                <a href="/admin">Admin Dashboard</a>
                <a href="#" onClick={() => { /* Add logout logic here */ }}>Logout</a>
            </div>
        </nav>
    );
}
export default AdminNavbar;