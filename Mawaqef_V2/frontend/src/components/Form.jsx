import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN , ROLE_TOKEN, AUTHORIZED_TOKEN} from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
/*
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const res = await api.post(route, { email, password });
            localStorage.setItem("ACCESS_TOKEN", res.data.access); // Store token
            localStorage.setItem("REFRESH_TOKEN", res.data.refresh); // Store refresh token
            console.log("Token stored:", localStorage.getItem("ACCESS_TOKEN")); // Verify storage
            console.log(res.data.role)
            navigate("/"); // Navigate after successful login
        } catch (error) {
            console.error("Login error", error);
            alert("Login failed");
        }
    };
*/
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { email, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
             
                console.log(res.data.role)
                navigate("/operator")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form