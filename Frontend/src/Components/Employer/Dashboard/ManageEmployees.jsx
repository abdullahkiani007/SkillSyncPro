import React, { useState, useEffect } from "react";
import employer from "../../../API/employer";
import { FaEye, FaArchive, FaTrashAlt, FaInbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManageEmployees = ({ companyId }) => {
  const [employees, setEmployees] = useState([]);
  const [unAuthEmployees, setUnAuthEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState("authorized"); // State to manage the active tab
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const navigate = useNavigate();

  const handleViewDetails = async (employeeId) => {
    let employee;
    try {
      console.log("Viewing details for employee", employeeId);
      employee = employees.find((emp) => emp.id === employeeId);
      if (!employee) {
        employee = unAuthEmployees.find((emp) => emp.id === employeeId);
      }
      console.log(employee);
      employee = {
        ...employee,
        user: {
          ...employee.user,
          createdAt: new Date(employee.user.createdAt).toLocaleDateString(),
        },
      };
      setSelectedEmployee(employee);
      setShowDetails(true);
    } catch (error) {
      console.error("Failed to fetch employee details", error);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const company = JSON.parse(localStorage.getItem("company"));
        const token = localStorage.getItem("accessToken");
        const response = await employer.getEmployees(token, company._id);
        console.log(response);
        setEmployees(response.data.employees.authEmployees);
        setUnAuthEmployees(response.data.employees.unAuthEmployees);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, [companyId]);

  const handleAuthorize = async (employeeId) => {
    console.log(unAuthEmployees);
    console.log("Authorizing employee", employeeId);
    try {
      const company = JSON.parse(localStorage.getItem("company"));
      const token = localStorage.getItem("accessToken");
      console.log(company._id);
      await employer.authorizeEmployee(token, company._id, employeeId);
      setUnAuthEmployees(
        unAuthEmployees.filter((emp) => emp.id !== employeeId)
      );
      setEmployees([...employees, { id: employeeId }]);
    } catch (error) {
      console.error("Failed to authorize employee", error);
    }
  };

  const handleRemove = async (employeeId) => {
    console.log("Removing employee", employeeId);
    try {
      const company = JSON.parse(localStorage.getItem("company"));
      const token = localStorage.getItem("accessToken");
      console.log(company._id);
      await employer.revokeEmployee(token, company._id, employeeId);
      setEmployees(employees.filter((emp) => emp.id !== employeeId));
    } catch (error) {
      console.error("Failed to remove employee", error);
    }
  };

  const handleDeleteRequest = async (employeeId) => {
    console.log("Deleting employee", employeeId);
    try {
      const company = JSON.parse(localStorage.getItem("company"));
      const token = localStorage.getItem("accessToken");
      await employer.deleteEmployee(token, company._id, employeeId);
      setUnAuthEmployees(employees.filter((emp) => emp.id !== employeeId));
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>

      {/* Tab Navigation */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 font-semibold rounded-l-md ${
            activeTab === "authorized"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("authorized")}
        >
          Authorized Employees
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-r-md ${
            activeTab === "unauthorized"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("unauthorized")}
        >
          Unauthorized Employees
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "authorized" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-slate-600 to-slate-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-slate-100 transition-colors"
                >
                  <td className="py-4 px-4">{`${employee.user.firstName} ${employee.user.lastName}`}</td>
                  <td className="py-4 px-4">{employee.user.email}</td>
                  <td className="py-4 px-4">{employee.role}</td>
                  <td className="py-4 px-4 ">
                    <div className="flex items-center justify-end space-x-4">
                      <button
                        onClick={() => handleViewDetails(employee.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Details"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`../messages/?id=${employee.user.id}`)
                        }
                        className="text-teal-500 hover:text-teal-700 transition-colors"
                        title="Message Employee"
                      >
                        <FaInbox className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Employee"
                      >
                        <FaTrashAlt className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {unAuthEmployees.length > 0 ? (
            <ul>
              {unAuthEmployees.map((employee) => (
                <li
                  key={employee.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p
                      className="font-semibold"
                      onClick={() => handleViewDetails(employee.id)}
                    >
                      {employee.user.firstName} {employee.user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                  </div>
                  <button
                    onClick={() => handleAuthorize(employee.id)}
                    className="text-green-500 hover:underline"
                  >
                    Authorize
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No unauthorized employees found.</p>
          )}
        </div>
      )}
      {showDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              {`${selectedEmployee.user.firstName} ${selectedEmployee.user.lastName}`}
            </h3>
            <p className="mb-4">
              <strong>Email:</strong> {selectedEmployee.user.email}
            </p>
            <div className="mb-4">
              <strong>Role:</strong>
              <p>{selectedEmployee.role}</p>
            </div>
            <div className="mb-4">
              <strong>Created At</strong>
              <p>{selectedEmployee.user.createdAt}</p>
            </div>
            {/* <div className="mb-4">
              <strong>Company:</strong>
              <p>{selectedEmployee.company.name}</p>
            </div> */}
            {/* Add other sections if needed */}
            <button
              onClick={handleCloseDetails}
              className="mt-4 py-2 px-4 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;
