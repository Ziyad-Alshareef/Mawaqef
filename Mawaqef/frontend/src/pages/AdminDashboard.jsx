import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";
import "../styles/AdminDashboard.css";
import ConfirmationModal from "../components/ConfirmationModal";

const AdminDashboard = () => {
  const [operators, setOperators] = useState([]);
  const [allOperators, setAllOperators] = useState([]); //ذا والي فوقه يختلفون الي تحت حق كل العملاء الي تم اعتمادهم
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [showAuthorized, setShowAuthorized] = useState(false);
  const [showAllAuthorized, setShowAllAuthorized] = useState(false); //الداشبورد اول ماتدخلها فاضية وفيه ازرار تفتح لك الجداول، السطر هذا والي فوقه حق انها تكون مخفية بالبداية لين تضغطها
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const navigate = useNavigate();
  const rowsPerPage = 5;

  useEffect(() => {
    const checkAdminRole = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const userRes = await api.get("/api/user/");
        if (userRes.data.role !== "admin") {
          navigate("/");
        } else {
          fetchOperators(); //Fetch unAuth
          fetchAllAuthorizedOperators(); // Fetch all Auth operators on load
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

  const fetchAllAuthorizedOperators = async () => {
    try {
      const res = await api.get("/api/operators/authorized/");
      setAllOperators(res.data);
    } catch (error) {
      console.error("Error fetching all authorized operators", error);
    }
  };

  const openModal = (operator, action) => {
    setCurrentOperator(operator);
    setActionType(action);
    setIsTableVisible(false); // Hide the table when the modal opens
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (actionType === 'accept') {
      await handleAuthorize(currentOperator.id);
    } else if (actionType === 'reject') {
      await RejectOP(currentOperator.id);
    } else if (actionType === 'delete') {
      await handleDelete(currentOperator.id);
    }
    setIsModalOpen(false);
    setIsTableVisible(true); // Show the table again after confirmation
  };

  const handleAuthorize = async (operatorId) => {
    try {
      const res = await api.patch(`/api/operators/${operatorId}/authorize/`);
      setOperators((prev) => prev.filter((operator) => operator.id !== operatorId));
      setAllOperators((prev) => [...prev, res.data]);
      await fetchAllAuthorizedOperators(); // Uncomment if the API changes need verification
    } catch (error) {
      console.error("Error authorizing operator", error);
    }
  };


  const RejectOP = async (operatorId) => {
    try {
      await api.delete(`/api/operators/${operatorId}/Reject/`);
      setOperators((prev) => prev.filter((operator) => operator.id !== operatorId));
    } catch (error) {
      console.error("Error rejecting operator", error);
    }
  };

  const handleDelete = async (operatorId) => {
    try {
      await api.delete(`/api/operators/${operatorId}/Reject/`); // Use the correct endpoint
      setAllOperators((prev) => prev.filter((operator) => operator.id !== operatorId));
    } catch (error) {
      console.error("Error deleting operator", error);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = operators.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(operators.length / rowsPerPage);

  // Pagination for all operators
  const indexOfLastRowAll = currentPageAll * rowsPerPage;
  const indexOfFirstRowAll = indexOfLastRowAll - rowsPerPage;
  const currentRowsAll = allOperators.slice(indexOfFirstRowAll, indexOfLastRowAll);
  const totalPagesAll = Math.ceil(allOperators.length / rowsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-container1">
        <button onClick={() => { setShowAuthorized(true); setShowAllAuthorized(false); }}>Show To Authorize Operators</button>
        <button onClick={() => { setShowAuthorized(false); setShowAllAuthorized(true); }}>Show All Authorized Operators</button>
      </div>

      {showAuthorized && isTableVisible && ( // Check if the table should be visible
        <div className="table-container">
          <h2 className='Table-heading'>Authorize Operators</h2>
          {operators.length === 0 ? (
            <p>No operators pending authorization.</p>
          ) : (
            <div>
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
                        <button onClick={() => openModal(operator, 'accept')}>Accept</button>
                        <button onClick={() => openModal(operator, 'reject')}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showAllAuthorized && isTableVisible && ( // Check if the table should be visible
        <div className="table-container">
          <h2 className='Table-heading'>All Authorized Operators</h2>
          {allOperators.length === 0 ? (
            <p>No authorized operators available for deletion.</p>
          ) : (
            <div>
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
                  {currentRowsAll.map((operator) => (
                    <tr key={operator.id}>
                      <td>{operator.organization}</td>
                      <td>{operator.email}</td>
                      <td>{operator.phone_number}</td>
                      <td>
                        <button onClick={() => openModal(operator, 'delete')}>Delete</button> {/* Delete button */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                {Array.from({ length: totalPagesAll }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPageAll(index + 1)}
                    className={currentPageAll === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsTableVisible(true); // Show the table again if modal is closed
        }}
        onConfirm={handleConfirm}
        operatorDetails={currentOperator}
        actionType={actionType} // Pass the action type to the modal
      />
    </div>
  );
};

export default AdminDashboard;
