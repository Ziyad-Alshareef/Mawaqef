import React from 'react';
import './Body1.css';

function Body1() {
    return (
        <div className="body1-container">
            <div className="image-container">
                <img
                    src={new URL('./assets/ParkingSpots-1.png', import.meta.url).href}
                    alt="Parking Spots Pic"
                    className="background-image"
                    onError={(e) => {
                        console.error("Image failed to load:", e);
                        e.target.style.display = 'none';
                    }}
                />
                <div className="content-wrapper">
                    <h1>Welcome to Mawaqef</h1>
                    <div className="search-container">
                        <input type="text" placeholder="Search for an Organization" className="search-input" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body1;