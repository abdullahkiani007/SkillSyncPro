import React, { useState, useEffect } from "react";
import admin from "../../../API/admin";
import { Modal, Button } from "@mantine/core";
import ModalContent from "./CompanyModal";

const ManageCompanies = () => {
  const [authorizedCompanies, setAuthorizedCompanies] = useState([]);
  const [unauthorizedCompanies, setUnauthorizedCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState("authorized");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await admin.getCompanies(token);

        setAuthorizedCompanies(
          response.data.filter((company) => company.authorized)
        );
        setUnauthorizedCompanies(
          response.data.filter((company) => !company.authorized)
        );
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleAuthorizeCompany = async (companyId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await admin.authorizeCompany(companyId, token);

      setUnauthorizedCompanies(
        unauthorizedCompanies.filter((company) => company._id !== companyId)
      );
      setAuthorizedCompanies([
        ...authorizedCompanies,
        {
          ...unauthorizedCompanies.find((company) => company._id === companyId),
          authorized: true,
        },
      ]);
    } catch (error) {
      console.error("Failed to authorize company", error);
    }
  };

  const handleCompanyClick = async (companyId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await admin.getCompanyDetails(companyId, token);
      console.log(response.data);
      setSelectedCompany(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch company details", error);
    }
  };

  const renderCompaniesTable = (companies) => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Company Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Industry
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Website
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Address
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {companies.map((company) => (
          <tr key={company._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {company.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {company.industry}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {company.website}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {company.address}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                onClick={() => handleCompanyClick(company._id)}
                className="text-teal-600 hover:text-teal-900"
              >
                View Details
              </button>
              {activeTab === "unauthorized" && (
                <button
                  onClick={() => handleAuthorizeCompany(company._id)}
                  className="ml-4 py-1 px-3 bg-teal-500 text-white rounded hover:bg-teal-600"
                >
                  Authorize
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
        Manage Companies
      </h2>
      <div className="mb-6">
        <button
          onClick={() => setActiveTab("authorized")}
          className={`py-2 px-4 ${
            activeTab === "authorized"
              ? "bg-teal-500 text-white"
              : "bg-gray-200"
          } rounded-l`}
        >
          Authorized Companies
        </button>
        <button
          onClick={() => setActiveTab("unauthorized")}
          className={`py-2 px-4 ${
            activeTab === "unauthorized"
              ? "bg-teal-500 text-white"
              : "bg-gray-200"
          } rounded-r`}
        >
          Unauthorized Companies
        </button>
      </div>
      <div>
        {activeTab === "authorized" &&
          renderCompaniesTable(authorizedCompanies)}
        {activeTab === "unauthorized" &&
          renderCompaniesTable(unauthorizedCompanies)}
      </div>

      {/* Modal for Company Details */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedCompany?.name || "Company Details"}
        size={"70%"}
      >
        {selectedCompany ? (
          <ModalContent company={selectedCompany} />
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default ManageCompanies;
