import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note";
import { ACCESS_TOKEN } from "../constants";
import "../styles/Home.css";

function Operator() {
    const [notes, setNotes] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [parkingMaps, setParkingMaps] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 0, length: 0 });
    const [orientation, setOrientation] = useState("horizontal");
    const [name, setName] = useState("");
    const [showAllMaps, setShowAllMaps] = useState(true);
    const [showAddMap, setshowAddMap] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [Mapid, setMapid] = useState("");
    const [parkingSpots, setParkingSpots] = useState([]);
    
    const [mapId, setMapId] = useState(""); // Ensure this is correctly set in your component
   
   
    const getColorByStatus = (status, sensor_status) => {
        switch (status) {
            case "sensor":
                if (sensor_status=="used")
                {return "red";}
                else{return "green"}
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
    const loadParkingMaps = async (operatorId) => {
        try {
            const res = await api.get(`/api/parking-map/${operatorId}/`); // Correct URL
            setParkingMaps(res.data);
        } catch (error) {
            console.error("Failed to load parking maps", error);
        }
    };

    const fetchParkingSpots = async () => {
        try {
            const response = await api.get(`/api/parking-map/${Mapid}/spots/`);
            setParkingSpots(response.data);
        } catch (error) {
            console.error("Error fetching parking spots:", error);
        }
    };

    // Function to flip the status of the parking spot when clicked
    const flipParkingSpotStatus = async (spotId) => {
        try {
            const response = await api.patch(`/api/parking-spot/${spotId}/flip-status/`);
            const updatedSpot = response.data;
            setParkingSpots((prevSpots) => 
                prevSpots.map((spot) => (spot.id === spotId ? updatedSpot : spot))
            );
        } catch (error) {
            console.error("Error flipping parking spot status:", error);
        }
    };

 
    useEffect(() => {
        if (Mapid) {
            console.log("Fetching parking spots for mapId:", Mapid);
            fetchParkingSpots(); // Initial fetch
            const interval = setInterval(fetchParkingSpots, 5000); // Fetch every 5 seconds
            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [Mapid]);

    useEffect(() => {
        console.log("Parking spots:", parkingSpots);
    }, [parkingSpots]);
    useEffect(() => {
        if (Mapid) {
            console.log("Fetching parking spots for mapId:", Mapid);
            fetchParkingSpots(); // Initial fetch
            const interval = setInterval(fetchParkingSpots, 5000); // Fetch every 5 seconds
            return () => clearInterval(interval); // Cleanup interval on unmount
        }

        // Function to get the color based on the parking spot status
    const getColorByStatus = (status, sensor_status) => {
        switch (status) {
            case "sensor":
                if (sensor_status=="used")
                {return "red";}
                else{return "green"}
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
                    setIsAuthorized(userRes.data.authorized);
                    if (userRes.data.authorized) {
                        loadParkingMaps(userRes.data.id);
                    }
                }
            } catch (error) {
                console.error("Unauthorized", error);
                navigate("/login");
            }
        };

        const loadParkingMaps = async (operatorId) => {
            try {
                const res = await api.get(`/api/parking-map/${operatorId}/`); // Correct URL
                setParkingMaps(res.data);
            } catch (error) {
                console.error("Failed to load parking maps", error);
            }
        };

        checkOperatorRole();
    }, [navigate], [Mapid]);

    const handleCreateParkingMap = async () => {
        try {
            const res = await api.post("/api/create-parking-map/", {
                name: name,
                width: dimensions.width,
                length: dimensions.length,
                orientation: orientation,
            });
            try {
                const userRes2 = await api.get("/api/user/");  
                loadParkingMaps(userRes2.data.id);
                
            } catch (error) {
                console.error("Unauthorized", error);
                
            }
            //setParkingMaps([...parkingMaps, res.data]);
        } catch (error) {
            console.error("Error creating parking map", error);
        }
    };

    return (
        <div>
            <h2 className="welcome-operator">Welcome Operator</h2>
            {isAuthorized&& showAllMaps && (
                <div>
                   
                    {
                        console.log(Mapid)
                    }

                    <div>
                        <h3 className="fontcolorsss">Parking Spot Maps</h3>
                        {parkingMaps.length > 0 ? (
                            parkingMaps.map((map) => (
                                <div key={map.id}>
                                    <h4 className="fontcolorsss">Map ID: {map.id}</h4>
                                    <h4 className="fontcolorsss">Name: {map.name}</h4>
                                    <p className="fontcolorsss">Dimensions: {map.width} x {map.length}</p>
                                    
                                    <button onClick={() => { setShowMap(true); setShowAllMaps(false); setMapid(map.id); console.log(map.id)}}>Edit Parking Spot Map</button>
                                </div>
                            )) 
                        ) : (
                            <p className="fontcolorsss">No parking spot maps available.</p>
                        )}
                    </div>

                    <div><br /> <br />
                        <h3 className="fontcolorsss">Create Parking Spot Map</h3>
                        <label className="fontcolorsss">
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </label>
                        <br/>
                        <label className="fontcolorsss">
                            Width:
                            <input
                                type="number"
                                value={dimensions.width}
                                onChange={(e) =>
                                    setDimensions({ ...dimensions, width: parseInt(e.target.value) })
                                }
                            />
                        </label>
                        <br/>
                        <label className="fontcolorsss">
                            Length:
                            <input
                                type="number"
                                value={dimensions.length}
                                onChange={(e) =>
                                    setDimensions({ ...dimensions, length: parseInt(e.target.value) })
                                }
                            />
                        </label>
                        <br/>
                        {/*
                        <label className="fontcolorsss">
                            Orientation:
                            <select
                                value={orientation}
                                onChange={(e) => setOrientation(e.target.value)}
                            >
                                <option value="horizontal">Horizontal</option>
                                <option value="vertical">Vertical</option>
                            </select>
                        </label>
                        */}
                        <br/>
                        <button onClick={handleCreateParkingMap}>Create Parking Spot Map</button>
                    </div>
                </div>
            )}
            {isAuthorized&& showMap && (<div>
                    <button onClick={() => { setShowMap(false); setShowAllMaps(true); setMapid(""); }}>
                        Back
                    </button>

                    {/* Render parking spots in a table */}
                    <table>
                        <tbody>
                            {parkingSpots.length > 0 && (
                                [...Array(Math.max(...parkingSpots.map(spot => spot.y_axis)) + 1)].map((_, row) => (
                                    <tr key={row}>
                                        {[...Array(Math.max(...parkingSpots.map(spot => spot.x_axis)) + 1)].map((_, col) => {
                                            const spot = parkingSpots.find(s => s.x_axis === col && s.y_axis === row);
                                            return (
                                                <td
                                                    key={col}
                                                    style={{ backgroundColor: spot ? getColorByStatus(spot.status, spot.sensor_status) : 'white' }}
                                                    onClick={() => spot && flipParkingSpotStatus(spot.id)}
                                                >
                                                    {spot ? `Spot ${spot.id}` : 'N/A'}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>)

            }
            
            
             { !isAuthorized && (
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



/*import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note"
import { ACCESS_TOKEN, REFRESH_TOKEN, ROLE_TOKEN, AUTHORIZED_TOKEN } from "../constants";
import "../styles/Home.css"

function operator() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminRole = async () => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            console.log(accessToken);
            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                const userRes = await api.get("/api/user/");
                if (userRes.data.role !== "operator") {
                    navigate("/");
                } else {
                    setIsAuthorized(userRes.data.authorized);
                }
            } catch (error) {
                console.error("Unauthorized", error);
                navigate("/login");
            }
        };
        checkAdminRole();
    }, []);
    console.log(localStorage.getItem("ACCESS_TOKEN"));

    return (
        <div>
            <h2 className="welcome-operator">Welcome Operator</h2>
            {isAuthorized ? (
                <div>
                    <p className="welcome-operator">You are authorized. be patient⏳</p>
                    
                </div>
            ) : (
                <div>
                    <p className="welcome-operator">You are not authorized. an admin will contact you soon 😊.</p>
                </div>
            )}
        </div>
    );
}

export default operator;
*/