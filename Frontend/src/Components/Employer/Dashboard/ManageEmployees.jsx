import React, { useState, useEffect } from "react";
import employer from "../../../API/employer";

const ManageEmployees = ({ companyId }) => {
  const [employees, setEmployees] = useState([]);
  const [unAuthEmployees, setUnAuthEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState("authorized"); // State to manage the active tab

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
    try {
      await axios.delete(`/api/company/${companyId}/employees/${employeeId}`);
      setEmployees(employees.filter((emp) => emp._id !== employeeId));
      setUnAuthEmployees([...unAuthEmployees, { _id: employeeId }]);
    } catch (error) {
      console.error("Failed to remove employee", error);
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
        <div>
          {employees.length > 0 ? (
            <ul>
              {employees.map((employee) => (
                <li
                  key={employee._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p className="font-semibold">
                      {employee.user.firstName} {employee.user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(employee._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No authorized employees found.</p>
          )}
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
                    <p className="font-semibold">
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
    </div>
  );
};

export default ManageEmployees;
