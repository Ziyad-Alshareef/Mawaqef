import React, { useState, useEffect } from "react";
import "../styles/Organizations.css";
import "../styles/Home.css";
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/organizations/");
                console.log("Organizations fetched: ", response.data);
                setLoading(false);
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

    const fetchParkingSpots = async (orgId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/parking-map/${orgId}/spots/`);
            console.log("Parking spots response:", response.data);
            if (Array.isArray(response.data)) {
                setParkingSpots(response.data);
            } else {
                setParkingSpots([]);
            }
        } catch (error) {
            console.error("Error fetching parking spots:", error);
            setParkingSpots([]);
        }
    };

    const handleCardClick = (org) => {
        setSelectedOrg(org);
        setShowMap(true);
        setLoadingM(true);
        fetchParkingSpots(org.id).finally(() => setLoadingM(false));
    };
    // FETCHING PARKING SPOTS FUNCTION, dont make it less than 1 second unless you want your server to fry out
    useEffect(() => {
        if (showMap && selectedOrg) {
            const interval = setInterval(() => {
                fetchParkingSpots(selectedOrg.id);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [showMap, selectedOrg]);

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
                <div className="map-view-container2">
                    <h2 className="map-heading">{selectedOrg?.name} Parking Map</h2>
                    <button className="back-button" onClick={handleBack}>
                        Back
                    </button>
                    <br />
                    <div className="table-cont1">
                        {loadingM ? (
                            <LoadingIndicator />
                        ) : (
                            <div className="centerre2">
                                {parkingSpots.length > 0 ? (
                                    <table>
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
                                                                        className="tdspots2"
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
                                    <p className="Gmessage">No parking spots available.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="organizations-container1">
                    <h1 className="heading1">Organizations Maps</h1>
                    <input
                        type="text"
                        placeholder="Search for an Organization's Parking Map..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input1"
                    />
                    <div className="card-container1">
                        {loading && <LoadingIndicator />}
                        {!loading &&filteredOrganizations.length> 0 ? (
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
                            // 
                        <br/>)}
                        {!loading &&filteredOrganizations.length== 0?(<p className="Gmessage2">No organizations found.</p>) :(<br/>) }
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Organizations;
