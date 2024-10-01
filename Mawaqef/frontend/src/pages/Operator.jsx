import { useState, useEffect } from "react";
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
                    {/* Add your authorized operator content here */}
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