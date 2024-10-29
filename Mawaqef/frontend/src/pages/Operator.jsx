import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import "../styles/Home.css";
import LoadingIndicator from "../components/LoadingIndicator";

function Operator() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [parkingMaps, setParkingMaps] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 0, length: 0 });
    const [orientation, setOrientation] = useState("horizontal");
    const [name, setName] = useState("");
    const [loc, setLoc] = useState("");
    const [showAllMaps, setShowAllMaps] = useState(true);
    const [showAddMap, setshowAddMap] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [Mapid, setMapid] = useState("");
    const [OPName, setOPName] = useState("");
    const [OPEmail, setOPEmail] = useState("");
    const [OPPN, setOPPN] = useState("");
    const [parkingSpots, setParkingSpots] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [mapId, setMapId] = useState("");
    const [showParkingMaps, setShowParkingMaps] = useState(false);
    const [showCreateMap, setShowCreateMap] = useState(false);
    const [isEditingMap, setIsEditingMap] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [loadingM, setLoadingM] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(OPPN);
    const [loadingP, setLoadingP] = useState(false);



    const handleEditClick = () => {
        setIsEditing(true);
        setPhoneNumber(OPPN);
        setMessage("");
    };

    const handleSaveClick = async () => {
        setMessage("");
        if (phoneNumber.length !=10){
            setMessage("Phone number must be 10 digits long.");
            return;
        }
        try {
            setLoadingP(true);
            await api.put("/api/update-phone/", { phone_number: phoneNumber });
            setMessage("Phone number updated successfully!");
            setOPPN(phoneNumber);
            setIsEditing(false);
            setLoadingP(false);
        } catch (error) {
            try {
                setLoadingP(true);
                await api.put("/api/update-phone/", { phone_number: phoneNumber });
                setMessage("Phone number updated successfully!");
                setOPPN(phoneNumber);
                setIsEditing(false);
                setLoadingP(false);
            } catch (error) {
                try {
                    setLoadingP(true);
                    await api.put("/api/update-phone/", { phone_number: phoneNumber });
                    setMessage("Phone number updated successfully!");
                    setOPPN(phoneNumber);
                    setIsEditing(false);
                    setLoadingP(false);
                } catch (error) {
                    console.error("Failed to update phone number:", error);
                    setMessage("Failed to update phone number. Please try again.");
                    setLoadingP(false);
                }
            }
        }
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

    const navigate = useNavigate();

    const fetchParkingMaps = async (operatorId) => {
        try {
            const res = await api.get(`/api/parking-map/${operatorId}/`);
            setParkingMaps(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Failed to load parking maps", error);

        }
    };

    const fetchParkingSpots = async () => {
        try {
            const response = await api.get(`/api/parking-map/${Mapid}/spots/`);
            setParkingSpots(response.data);
            setLoadingM(false);
        } catch (error) {
            console.error("Error fetching parking spots:", error);
        }
    };


    const flipParkingSpotStatus = async (spotId) => {
        try {
            setLoadingM(true);
            const response = await api.patch(`/api/parking-spot/${spotId}/flip-status/`);
            const updatedSpot = response.data;
            fetchParkingSpots();
            setParkingSpots((prevSpots) =>
                prevSpots.map((spot) => (spot.id === spotId ? updatedSpot : spot))
            );
            setLoadingM(false);
        } catch (error) {
            console.error("Error flipping parking spot status:", error);
            setLoadingM(false);
        }
    };

    useEffect(() => {
        const checkOperatorRole = async () => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                const userRes = await api.get("/api/user/");
                if (userRes.data.role !== "operator") {
                    navigate("/");
                } else {
                    setOPName(userRes.data.organization);
                    setOPEmail(userRes.data.email);
                    setOPPN(userRes.data.phone_number);
                    setIsAuthorized(userRes.data.authorized);
                    if (userRes.data.authorized) {
                        fetchParkingMaps(userRes.data.id);
                    } else setLoading(false);
                }
            } catch (error) {
                console.error("Unauthorized", error);
                navigate("/login");
            }
        };

        checkOperatorRole();
    }, [navigate]);

    useEffect(() => {
        if (Mapid) {
            console.log("Fetching parking spots for mapId:", Mapid);

            fetchParkingSpots();

            const interval = setInterval(fetchParkingSpots, 5000);
            return () => clearInterval(interval);
        }
    }, [Mapid]);

    useEffect(() => {
        console.log("Parking spots:", parkingSpots);
    }, [parkingSpots]);


    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = parkingMaps.slice(indexOfFirstCard, indexOfLastCard);


    const totalPages = Math.ceil(parkingMaps.length / cardsPerPage);
    const loadParkingMaps = async (operatorId) => {
        try {
            const res = await api.get(`/api/parking-map/${operatorId}/`); // Correct URL
            setParkingMaps(res.data);
        } catch (error) {
            console.error("Failed to load parking maps", error);
        }
    };

    const handleCreateParkingMap = async () => {
        setError(null);
        setSuccess(null);


        if (dimensions.width < 1 || dimensions.length < 1) {
            setError("Width and length must be positive numbers.");
            return;
        }

        if (name.length < 1) {
            setError("Name cannot be empty.");
            return;
        }
        try {
            setLoadingM(true);
            const res = await api.post("/api/create-parking-map/", {
                name: name,
                width: parseInt(dimensions.width),
                length: parseInt(dimensions.length),
                orientation: orientation,
                loc: loc
            });


            const newMap = {
                id: res.data.id,
                name: res.data.name,
                width: res.data.width,
                length: res.data.length,
                orientation: res.data.orientation,
                loc: res.data.loc,
            };

            try {
                const userRes2 = await api.get("/api/user/");
                loadParkingMaps(userRes2.data.id);

            } catch (error) {
                console.error("Unauthorized", error);

            }
            //setParkingMaps((prev) => [...prev, newMap]);


            //setShowCreateMap(false);
            setLoadingM(false);
            setName("");
            setLoc("");
            setSuccess("Parking Spots Map added successfully!")
            setDimensions({ width: 0, length: 0 });
        } catch (error) {
            console.error("Error creating parking map", error);
            setError("Error creating parking map, Please try again.")
            fetchParkingMaps();
            setLoadingM(false);
        }
    };

    const handleEditMap = (mapId) => {
        setMapid(mapId);
        setIsEditingMap(true);
        setLoadingM(true);
        setShowParkingMaps(false);
        setShowMap(true);
    };

    const handleBack = () => {
        setShowParkingMaps(true);
        setShowMap(false);
        setMapid("");
        setIsEditingMap(false);
        setParkingSpots([]);
        setLoadingM(false);
    };

    useEffect(() => {
        const updateCardsPerPage = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            if (height >= 1000 && width >= 769) {
                setCardsPerPage(6);
            }
            //
            else if (height >= 1025 && width >= 768) {
                setCardsPerPage(4);
            }
            //
            else if (height < 846) {
                setCardsPerPage(1);
            }
            else if (height ==1024 && width ==768){
                setCardsPerPage(2);
            }
            else if (width >= 1200) {
                setCardsPerPage(12);
            } else if (width >= 768) {
                setCardsPerPage(10);
            } else if (width >= 390) {
                setCardsPerPage(2);
            }
            else {
                setCardsPerPage(1); //very small
            }
        };

        updateCardsPerPage(); // Set initial value
        window.addEventListener('resize', updateCardsPerPage); // Update on resize

        return () => {
            window.removeEventListener('resize', updateCardsPerPage);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="operator-container">
            <h2 className="welcome-operator">Operator Dashboard</h2>
            {isAuthorized && !isEditingMap && (
                <div className="button-container">
                    <button className="Opbutton" onClick={() => { setShowParkingMaps(true); setShowCreateMap(false); setShowProfile(false);}}>Show Parking Spot Maps</button>
                    <button className="Opbutton" onClick={() => { setShowParkingMaps(false); setShowCreateMap(true); setShowProfile(false); setError(null); setSuccess(null); }}>Create Parking Spot Map</button>
                    <button className="Opbutton" onClick={() => { setShowParkingMaps(false); setShowCreateMap(false); setShowProfile(true); setMessage(""); setIsEditing(false);}}>Show Profile details</button>
                </div>
            )}

            {isAuthorized && showParkingMaps && (
                <>
                    <h3 className="fontcolorsss">Parking Spot Maps</h3>
                    <div className="card-container">
                        {currentCards.length > 0 ? (
                            currentCards.map((map) => (
                                <div className="card" key={map.id}>
                                    <h4 className="fontcolorsss">Map ID: {map.id}</h4>
                                    <h4 className="fontcolorsss">Name: {map.name}</h4>
                                    <a href={map.loc}> Location</a>
                                    <p className="fontcolorsss">Dimensions: {map.width} x {map.length}</p>
                                    <p className="fontcolorsss">Status: {map.accepted ? 'Accepted✅' : 'Pending⏳'}</p>
                                    <button className="Opbutton" onClick={() => handleEditMap(map.id)}>Edit Parking Spot Map</button>
                                </div>
                            ))
                        ) : (
                            <p className="fontcolorsss">No parking spot maps available.</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        {currentPage > 1 && (
                            <button onClick={() => setCurrentPage(currentPage - 1)}>
                                Previous
                            </button>
                        )}

                        {currentPage < totalPages && (
                            <button onClick={() => setCurrentPage(currentPage + 1)}>
                                Next
                            </button>
                        )}
                    </div>
                </>
            )}

            {isAuthorized && showCreateMap && (
                <div className="create-map-container">
                    <h3 className="create-map-heading">Create Parking Spot Map</h3>
                    <label className="create-map-label">
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <br />
                    <label className="create-map-label">
                        Width:
                        <input
                            type="number"
                            value={dimensions.width}
                            onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                        />
                    </label>
                    <br />
                    <label className="create-map-label">
                        Length:
                        <input
                            type="number"
                            value={dimensions.length}
                            onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                        />
                    </label>
                    <br />
                    <label className="create-map-label">
                        Location:
                        <input
                            type="text"
                            value={loc}
                            onChange={(e) => setLoc(e.target.value)}
                        />
                    </label>
                    <br />
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <br />
                    {loadingM && <LoadingIndicator />}
                    <br />
                    <button className="create-map-button" onClick={handleCreateParkingMap}>Create Parking Spot Map</button>
                </div>
            )}

            {isAuthorized && showProfile && (
                <div className="card">
                    <h3 className="create-map-heading">Profile</h3>
                   <br/>
                        
                        <h4 className="fontcolorsss">Oragnization: {OPName}</h4>
                    
                    <br />
                    
                        
                        <h4 className="fontcolorsss">Email: {OPEmail}</h4>
                    
                    <br />
                    
                        
                    <h4 className="fontcolorsss">
                    Phone Number:{" "}
                    {isEditing ? (
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    ) : (
                        OPPN
                    )} 
                    <button onClick={isEditing ? handleSaveClick : handleEditClick}>
                        {isEditing ? "Save" : "Edit"}
                    </button>
                </h4>
                <br />
                {loadingP&& <LoadingIndicator />}
                <br/>
                {message && <p>{message}</p>} {/* Display success or failure message */}
                    <br />
                    
                </div>
            )}

            {isAuthorized && showMap && (
                <>
                    <button className="Opbutton" onClick={handleBack}>
                        Back
                    </button>{loadingM && <LoadingIndicator />}
                    <div className="table-cont"><div className="centerre"> </div>

                        {/* Render parking spots in a table */}
                        <table>
                            <tbody>
                                {parkingSpots.length > 0 && (
                                    [...Array(Math.max(...parkingSpots.map(spot => spot.y_axis)) + 1)].map((_, row) => (
                                        <tr key={row}>
                                            {[...Array(Math.max(...parkingSpots.map(spot => spot.x_axis)) + 1)].map((_, col) => {
                                                const spot = parkingSpots.find(s => s.x_axis === col && s.y_axis === row);
                                                return (
                                                    <td className="tdspots"
                                                        key={col}
                                                        style={{ backgroundColor: spot ? getColorByStatus(spot.status, spot.sensor_status) : 'white' }}

                                                    >{/* onClick={() => spot && flipParkingSpotStatus(spot.id)} */}
                                                        {spot ? `${spot.id}` : 'N/A'}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {!isAuthorized && (
                <div>
                    <p className="welcome-operator">
                        You are not authorized. An admin will contact you soon 😊.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Operator;
