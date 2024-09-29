import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN , ROLE_TOKEN, AUTHORIZED_TOKEN} from "../constants";
import api from "../api";  // axios instance with base URL and token setup
//import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is an admin
    /*
    const checkAdminRole = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            // Fetch user details to check the role
            const res = await api.get("/api/user/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (res.data.role !== 'admin') {
                navigate("/login");
                return;
            }

            // Fetch unauthorized operators if the user is admin
            const operatorsRes = await api.get("/api/operators/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setOperators(operatorsRes.data);
        } catch (error) {
            console.error("Error checking role or fetching operators:", error);
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };
    */
    const checkAdminRole = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      console.log(accessToken);
      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const userRes = await api.get("/api/user/");
        if (userRes.data.role !== "admin") {
          navigate("/");
        } else {
          fetchOperators();
        }
      } catch (error) {
        console.error("Unauthorized", error);
        navigate("/login");
      }
    };

    checkAdminRole();
  }, [navigate]);

  const fetchOperators = async () => {
    try {
      const res = await api.get("/api/operators/unapproved/");
      setOperators(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching operators", error);
    }
  };

  const handleAuthorize = async (operatorId) => {
    try {
      await api.patch(`/api/operators/${operatorId}/authorize/`);
      setOperators((prev) => prev.filter((operator) => operator.id !== operatorId));
    } catch (error) {
      console.error("Error authorizing operator", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Authorize Operators</h1>
      {operators.length === 0 ? (
        <p>No operators pending authorization.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {operators.map((operator) => (
              <tr key={operator.id}>
                <td>{operator.organization}</td>
                <td>{operator.email}</td>
                <td>{operator.phone_number}</td>
                <td>
                  <button onClick={() => handleAuthorize(operator.id)}>Authorize</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;



/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";  // axios instance with base URL and token setup
//import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is an admin
    const checkAdminRole = async () => {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");
      console.log(accessToken);
      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const userRes = await api.get("/api/user/");
        if (userRes.data.role !== "admin") {
          navigate("/login");
        } else {
          fetchOperators();
        }
      } catch (error) {
        console.error("Unauthorized", error);
        navigate("/login");
      }
    };

    checkAdminRole();
  }, [navigate]);

  const fetchOperators = async () => {
    try {
      const res = await api.get("/api/operators/unapproved/");
      setOperators(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching operators", error);
    }
  };

  const handleAuthorize = async (operatorId) => {
    try {
      await api.patch(`/api/operators/${operatorId}/authorize/`);
      setOperators((prev) => prev.filter((operator) => operator.id !== operatorId));
    } catch (error) {
      console.error("Error authorizing operator", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Authorize Operators</h1>
      {operators.length === 0 ? (
        <p>No operators pending authorization.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {operators.map((operator) => (
              <tr key={operator.id}>
                <td>{operator.organization}</td>
                <td>{operator.email}</td>
                <td>{operator.phone_number}</td>
                <td>
                  <button onClick={() => handleAuthorize(operator.id)}>Authorize</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
*/