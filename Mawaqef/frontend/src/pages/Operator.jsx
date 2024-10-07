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
    const navigate = useNavigate();

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
    }, [navigate]);

    const handleCreateParkingMap = async () => {
        try {
            const res = await api.post("/api/create-parking-map/", {
                name: name,
                width: dimensions.width,
                length: dimensions.length,
                orientation: orientation,
            });
            setParkingMaps([...parkingMaps, res.data]);
        } catch (error) {
            console.error("Error creating parking map", error);
        }
    };

    return (
        <div>
            <h2 className="welcome-operator">Welcome Operator</h2>
            {isAuthorized ? (
                <div>
                   
                    <div>
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
                        <br/>
                        <button onClick={handleCreateParkingMap}>Create Parking Spot Map</button>
                    </div>

                    <div>
                        <h3 className="fontcolorsss">Parking Spot Maps</h3>
                        {parkingMaps.length > 0 ? (
                            parkingMaps.map((map) => (
                                <div key={map.id}>
                                    <h4 className="fontcolorsss">Map ID: {map.id}</h4>
                                    <h4 className="fontcolorsss">Name: {map.name}</h4>
                                    <p className="fontcolorsss">Dimensions: {map.width} x {map.length}</p>
                                    <p className="fontcolorsss">Orientation: {map.orientation}</p>
                                </div>
                            ))
                        ) : (
                            <p className="fontcolorsss">No parking spot maps available.</p>
                        )}
                    </div>
                </div>
            ) : (
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