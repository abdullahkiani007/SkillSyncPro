// src/components/ManageEmployees.js
import React, { useState, useEffect } from "react";
import { FaEye, FaArchive, FaTrashAlt } from "react-icons/fa";
import admin from "../../../API/admin";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await admin.getAllEmployees(token);
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleViewDetails = async (employeeId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await admin.getEmployeeDetails(employeeId, token);
      setSelectedEmployee(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error("Failed to fetch employee details", error);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedEmployee(null);
  };

  const handleArchiveEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await admin.archiveEmployee(employeeId, token);
      setEmployees(employees.filter((emp) => emp._id !== employeeId));
    } catch (error) {
      console.error("Failed to archive employee", error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await admin.deleteEmployee(employeeId, token);
      setEmployees(employees.filter((emp) => emp._id !== employeeId));
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-slate-900 mb-8">
        Manage Employees
      </h2>

      {/* Employees Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-slate-600 to-slate-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className="border-b hover:bg-slate-100 transition-colors"
              >
                <td className="py-4 px-4">{`${employee.user.firstName} ${employee.user.lastName}`}</td>
                <td className="py-4 px-4">{employee.user.email}</td>
                <td className="py-4 px-4">{employee.role}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleViewDetails(employee._id)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="View Details"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleArchiveEmployee(employee._id)}
                      className="text-teal-500 hover:text-teal-700 transition-colors"
                      title="Archive Employee"
                    >
                      <FaArchive className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee._id)}
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

      {/* Employee Details Modal */}
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
              <strong>Company:</strong>
              <p>{selectedEmployee.company.name}</p>
            </div>
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
