/*
import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Organizations.css"; // Make sure to create a CSS file for styling
import '../styles/home.css';
import axios from 'axios';

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/organizations/");
                setOrganizations(response.data);
            } catch (error) {
                console.error("Error fetching organizations:", error);
            }
        };
        fetchOrganizations();
    }, []);

    useEffect(() => {
        const results = organizations.filter(org =>
            org.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrganizations(results);
    }, [searchTerm, organizations]);

    return (
        <div className="organizations-container1">
            <h1 className="heading1">Organizations</h1>
            <input
                type="text"
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input1"
            />
            <div className="card-container1">
                {filteredOrganizations.length > 0 ? (
                    filteredOrganizations.map((org) => (
                        <div className="card1" key={org.id}>
                            <h4 className="card-title1">{org.name}</h4>
                            <p className="card-text1">Organization: {org.org}</p>
                            <p className="card-link1"><a href={org.loc}>Location</a></p>
                        </div>
                    ))
                ) : (
                    <p className="no-results1">No organizations found.</p>
                )}
            </div>
        </div>
    );
};

export default Organizations;
*/

import React, { useState, useEffect } from "react";
import "../styles/Organizations.css";
import '../styles/home.css';
import axios from 'axios';

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/organizations/");
                setOrganizations(response.data);
            } catch (error) {
                console.error("Error fetching organizations:", error);
            }
        };
        fetchOrganizations();
    }, []);

    useEffect(() => {
        const results = organizations.filter(org =>
            org.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrganizations(results);
    }, [searchTerm, organizations]);

    return (
        <div className="organizations-background1">
            <div className="organizations-container1">
                <h1 className="heading1">Organizations</h1>
                <input
                    type="text"
                    placeholder="Search organizations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input1"
                />
                <div className="card-container1">
                    {filteredOrganizations.length > 0 ? (
                        filteredOrganizations.map((org) => (
                            <div className="card1" key={org.id}>
                                <h4 className="card-title1">{org.name}</h4>
                                <p className="card-text1">Organization: {org.org}</p>
                                <p className="card-link1"><a href={org.loc}>Location</a></p>
                            </div>
                        ))
                    ) : (
                        <p className="no-results1">No organizations found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Organizations;
