import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, ROLE_TOKEN, AUTHORIZED_TOKEN } from "../constants";
import api from "../api";  // axios instance with base URL and token setup
import "../styles/AdminDashboard.css";  // Import the CSS file

const AdminDashboard = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const rowsPerPage = 6;

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = operators.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(operators.length / rowsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Authorize Operators</h1>
      {operators.length === 0 ? (
        <p>No operators pending authorization.</p>
      ) : (
        <div className="table-container">
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
              {currentRows.map((operator) => (
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
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;