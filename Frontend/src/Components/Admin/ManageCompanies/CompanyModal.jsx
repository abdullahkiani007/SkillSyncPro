import React from "react";

// Modal content update to display creator, employees, and jobs
const ModalContent = ({ company }) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <img
        src={company.logo || "/default-logo.png"}
        alt={company.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
        <p className="text-gray-700 text-base">{company.description}</p>
        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Industry:</span>{" "}
              {company.industry}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Website:</span> {company.website}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Address:</span> {company.address}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Contact Email:</span>{" "}
              {company.contactEmail}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Contact Phone:</span>{" "}
              {company.contactPhone}
            </p>
          </div>
          <div className="flex-1">
            {company.createdBy && (
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-800">
                  Created By:
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Name:</span>{" "}
                  {company.createdBy.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Email:</span>{" "}
                  {company.createdBy.email}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {company.employees.length > 0 && (
            <div>
              <p className="text-lg font-semibold text-gray-800">Employees:</p>
              <ul className="list-disc list-inside pl-4">
                {company.employees.map((emp) => (
                  <li key={emp._id} className="text-sm text-gray-600">
                    {emp.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {company.jobs.length > 0 && (
            <div>
              <p className="text-lg font-semibold text-gray-800">Jobs:</p>
              <ul className="list-disc list-inside pl-4">
                {company.jobs.map((job) => (
                  <li key={job._id} className="text-sm text-gray-600">
                    {job.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {company.unAuthEmployees.length > 0 && (
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Unauthorized Employees:
              </p>
              <ul className="list-disc list-inside pl-4">
                {company.unAuthEmployees.map((emp) => (
                  <li key={emp._id} className="text-sm text-gray-600">
                    {emp.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
