import React, { useState, useEffect } from "react";
import "../styles/Organizations.css";
import "../styles/home.css";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showMap, setShowMap] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [parkingSpots, setParkingSpots] = useState([]);
    const [loadingM, setLoadingM] = useState(false);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/organizations/");
                console.log("Organizations fetched: ", response.data);
                setOrganizations(response.data);
                setFilteredOrganizations(response.data);
            } catch (error) {
                console.error("Error fetching organizations:", error);
            }
        };
        fetchOrganizations();
    }, []);

    useEffect(() => {
        const results = organizations.filter(
            (org) =>
                org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                org.org.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrganizations(results);
    }, [searchTerm, organizations]);

    const handleCardClick = async (org) => {
        setSelectedOrg(org);
        setShowMap(true);
        setLoadingM(true);

        try {
            const response = await axios.get(`http://localhost:8000/api/parking-map/${org.id}/spots/`);
            console.log("Parking spots response:", response.data);
            if (Array.isArray(response.data)) {
                setParkingSpots(response.data);
            } else {
                setParkingSpots([]);
            }
        } catch (error) {
            console.error("Error fetching parking spots:", error);
            setParkingSpots([]);
        } finally {
            setLoadingM(false);
        }
    };

    const handleBack = () => {
        setShowMap(false);
        setSelectedOrg(null);
        setParkingSpots([]);
    };

    const getColorByStatus = (status, sensor_status) => {
        switch (status) {
            case "sensor":
                return sensor_status === "used" ? "red" : "green";
            case "maintenance":
                return "yellow";
            case "unavailable":
                return "gray";
            case "road":
                return "black";
            default:
                return "white";
        }
    };

    return (
        <div className="organizations-background1">
            {showMap ? (
                // Map View
                <div className="map-view-container">
                    <button className="back-button" onClick={handleBack}>
                        Back
                    </button>
                    <h2 className="map-heading">Parking Map for {selectedOrg?.name}</h2>
                    {loadingM ? (
                        <LoadingIndicator />
                    ) : (
                        <div className="map-container">
                            {parkingSpots.length > 0 ? (
                                <table className="map-table">
                                    <tbody>
                                        {[...Array(Math.max(...parkingSpots.map((spot) => spot.y_axis)) + 1)].map(
                                            (_, row) => (
                                                <tr key={row}>
                                                    {[...Array(Math.max(...parkingSpots.map((spot) => spot.x_axis)) + 1)].map(
                                                        (_, col) => {
                                                            const spot = parkingSpots.find(
                                                                (s) => s.x_axis === col && s.y_axis === row
                                                            );
                                                            return (
                                                                <td
                                                                    className="tdspots"
                                                                    key={col}
                                                                    style={{
                                                                        backgroundColor: spot
                                                                            ? getColorByStatus(spot.status, spot.sensor_status)
                                                                            : "white",
                                                                    }}
                                                                >
                                                                    { }
                                                                </td>
                                                            );
                                                        }
                                                    )}
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No parking spots available.</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                // Organization List View
                <div className="organizations-container1">
                    <h1 className="heading1">Organizations Maps</h1>
                    <input
                        type="text"
                        placeholder="Search for an Organization Map..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input1"
                    />
                    <div className="card-container1">
                        {filteredOrganizations.length > 0 ? (
                            filteredOrganizations.map((org) => (
                                <div
                                    className="card1"
                                    key={org.id}
                                    onClick={() => handleCardClick(org)}
                                >
                                    <h4 className="card-title1">{org.name}</h4>
                                    <p className="card-text1">Organization: {org.org}</p>
                                    <p className="card-link1">
                                        <a href={org.loc} target="_blank" rel="noopener noreferrer">
                                            Location
                                        </a>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="no-results1">No organizations found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Organizations;
