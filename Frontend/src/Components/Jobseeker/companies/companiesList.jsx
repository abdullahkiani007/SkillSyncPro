import React, { useEffect, useState } from "react";
import companyLogo from "../../../assets/companyLogo.png";
import jobseeker from "../../../API/jobseeker";

import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Static data based on the company schema
const companiesData = [
  {
    id: 1,
    name: "Tech Innovators Inc.",
    description: "Leading the way in tech innovation and solutions.",
    industry: "Technology",
    website: "https://techinnovators.com",
    logo: "https://via.placeholder.com/150",
    address: "1234 Tech Park, Silicon Valley, CA",
    contactEmail: "contact@techinnovators.com",
    contactPhone: "123-456-7890",
    employees: ["Employer1", "Employer2"],
    jobs: ["Job1", "Job2"],
  },
  {
    id: 2,
    name: "Green Energy Solutions",
    description: "Providing sustainable energy solutions for a better future.",
    industry: "Energy",
    website: "https://greenenergy.com",
    logo: "https://via.placeholder.com/150",
    address: "5678 Greenway Blvd, Austin, TX",
    contactEmail: "info@greenenergy.com",
    contactPhone: "987-654-3210",
    employees: ["Employer3", "Employer4"],
    jobs: ["Job3", "Job4"],
  },
  {
    id: 3,
    name: "Bloomberg",
    description: "Making world a better place.",
    industry: "IT",
    website: "https://greenenergy.com",
    logo: "https://via.placeholder.com/150",
    address: "5678 Greenway Blvd, Austin, TX",
    contactEmail: "info@greenenergy.com",
    contactPhone: "987-654-3210",
    employees: ["Employer3", "Employer4"],
    jobs: ["Job3", "Job4"],
  },
  {
    id: 4,
    name: "Tech Innovators Inc.",
    description: "Leading the way in tech innovation and solutions.",
    industry: "Technology",
    website: "https://techinnovators.com",
    logo: "https://via.placeholder.com/150",
    address: "1234 Tech Park, Silicon Valley, CA",
    contactEmail: "contact@techinnovators.com",
    contactPhone: "123-456-7890",
    employees: ["Employer1", "Employer2"],
    jobs: ["Job1", "Job2"],
  },
  {
    id: 5,
    name: "Green Energy Solutions",
    description: "Providing sustainable energy solutions for a better future.",
    industry: "Energy",
    website: "https://greenenergy.com",
    logo: "https://via.placeholder.com/150",
    address: "5678 Greenway Blvd, Austin, TX",
    contactEmail: "info@greenenergy.com",
    contactPhone: "987-654-3210",
    employees: ["Employer3", "Employer4"],
    jobs: ["Job3", "Job4"],
  },
  {
    id: 6,
    name: "Bloomberg",
    description: "Making world a better place.",
    industry: "IT",
    website: "https://greenenergy.com",
    logo: "https://via.placeholder.com/150",
    address: "5678 Greenway Blvd, Austin, TX",
    contactEmail: "info@greenenergy.com",
    contactPhone: "987-654-3210",
    employees: ["Employer3", "Employer4"],
    jobs: ["Job3", "Job4"],
  },
];

const CompaniesList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch companies data from the server
    const fetchCompanies = async () => {
      const response = await jobseeker.getCompanies();
      if (response.status === 200) {
        console.log(response.data.data);
        setCompanies(response.data.data);
        localStorage.setItem(
          "companiesData",
          JSON.stringify(response.data.data)
        );
      } else {
        console.log("Error fetching companies data");
      }
    };
    fetchCompanies();
  }, []);

  return (
    <Container maxWidth="lg" className=" pt-20 bg-white">
      <h1 className="font-bold text-2xl text-center text-secondary-dark w-full border-b">
        Companies
      </h1>

      <div className="flex flex-row flex-wrap w-full ">
        {companies.map((company) => {
          return (
            <div
              key={company._id}
              onClick={() => navigate(`../companies/${company._id}`)}
              className="bg-white shadow-2xl shadow-black px-2 py-10 rounded-xl w-52 md:w-80 mr-10 mt-20"
            >
              <div className="">
                <div className="flex justify-center items-center ">
                  <img
                    className="rounded-full w-20 absolute -translate-y-12"
                    src={companyLogo}
                    alt="company logo"
                  />
                </div>
                <h1 className="text-gray-700 text-center">{company.name}</h1>
                <h1 className="text-gray-400 text-sm  underline hover:cursor-pointer text-center">
                  {company.website}
                </h1>
                <h2 className="font-bold text-gray-600 mt-6">
                  Industry :{" "}
                  <span className="text-gray-400 font-normal">
                    {company.industry}
                  </span>
                </h2>
                <h2 className="font-bold text-gray-600 mt-2">
                  Email :{" "}
                  <span className="text-gray-400 font-normal text-sm">
                    {company.contactEmail}
                  </span>
                </h2>
                <h2 className="font-bold text-gray-600 mt-2">
                  Phone :{" "}
                  <span className="text-gray-400 font-normal text-sm">
                    {company.contactPhone}
                  </span>
                </h2>
                <h2 className="font-bold text-gray-600 mt-2">
                  Address :{" "}
                  <span className="text-gray-400 font-normal text-sm">
                    {company.address}
                  </span>
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default CompaniesList;
