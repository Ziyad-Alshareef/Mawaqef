/*import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            if (!accessToken) {
                setUser(null);
                setLoading(false);
                navigate("/login");
                return;
            }

            try {
                const res = await api.get("/api/user/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
*/