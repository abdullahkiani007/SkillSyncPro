import React, { useState, useEffect } from "react";
import employer from "../../../API/employer";

const ManageCompany = () => {
  const [company, setCompany] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    logo: "",
    background: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    // Fetch company data from the backend
    const fetchCompanyData = async () => {
      const response = await employer.getCompany(
        localStorage.getItem("accessToken")
      );
      console.log(response.data.data);
      setCompany(response.data.data);
    };

    fetchCompanyData();
  }, []);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employer.updateCompany(
        company,
        localStorage.getItem("accessToken")
      );
      alert("Company details updated successfully");
    } catch (error) {
      console.error("Failed to update company details", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold">Company Name</label>
            <input
              type="text"
              name="name"
              value={company.name}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Industry</label>
            <input
              type="text"
              name="industry"
              value={company.industry}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Website</label>
            <input
              type="text"
              name="website"
              value={company.website}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={company.contactEmail}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Contact Phone</label>
            <input
              type="text"
              name="contactPhone"
              value={company.contactPhone}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={company.address}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageCompany;
