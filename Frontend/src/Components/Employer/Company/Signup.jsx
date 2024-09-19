import React, { useState, useEffect } from "react";
import { Notification } from "@mantine/core";
import employer from "../../../API/employer";
import {
  Container,
  InputLabel,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import ImageUpload from "../../Uploader/ImageUploader";

const Signup = () => {
  const [option, setOption] = useState("join");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const [newCompany, setNewCompany] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    logo: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    backgroundPic: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await employer.getAllCompanyNames();
        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const handleNewCompanyChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (url) => {
    setNewCompany({ ...newCompany, logo: url });
  };

  const handleBackgroundUpload = (url) => {
    setNewCompany({ ...newCompany, backgroundPic: url });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("accessToken");
    e.preventDefault();
    if (option === "join") {
      try {
        const response = await employer.joinCompany(selectedCompany, token);
        if (response.status === 200) {
          setNotification("You have successfully joined the company");
          setShowNotification(true);
        }
      } catch (err) {
        console.log(err.response.data.message);
        setNotification(err.response.data.message);
        setShowNotification(true);
        console.error("Error joining company:", err);
      }

      console.log("Joining company", selectedCompany);
    } else {
      console.log("Registering new company", newCompany);
      try {
        const response = await employer.registerCompany(newCompany, token);
        if (response.status === 200) {
          setNotification("You have successfully registered the company");
          setShowNotification(true);
        }
      } catch (err) {
        console.log(err.response.data.message);
        setNotification(err.response.data.message);
        setShowNotification(true);
        console.error("Error registering company:", err);
      }
      
    }
  };

  return (
    <div className="  bg-gray-100 h-full min-h-screen p-10 rounded-lg shadow-lg flex justify-center ">
      {showNotification && (
        <div className="fixed right-5 bottom-5S">
          <Notification
            withBorder
            title="We notify you that"
            onClose={() => setShowNotification(false)}
          >
            {notification}
          </Notification>
        </div>
      )}
      <div className="bg-white rounded-xl p-20 shadow-2xl">
        <Typography
          variant="h4"
          component="h1"
          className="font-bold mb-8 text-center text-gray-800 w-fit"
        >
          Company Form
        </Typography>
        <form
          className="w-full max-w-2xl flex flex-col space-y-6"
        >
          <FormControl component="fieldset" className="mb-8">
            <FormLabel
              component="legend"
              className="text-lg font-semibold text-gray-700 text-center mt-10"
            >
              Choose an Option
            </FormLabel>
            <RadioGroup
              row
              value={option}
              onChange={handleOptionChange}
              className="flex justify-center mt-4"
            >
              <FormControlLabel
                value="join"
                control={<Radio />}
                label="Join a Company"
                className="mr-6"
              />
              <FormControlLabel
                value="register"
                control={<Radio />}
                label="Register a Company"
                className="ml-6"
              />
            </RadioGroup>
          </FormControl>

          {option === "join" ? (
            <div className="flex justify-center w-full">
              <div className="w-full md:w-3/4">
                <FormControl fullWidth margin="normal">
                  <InputLabel>Select Company</InputLabel>
                  <Select
                    label="Select Company"
                    value={selectedCompany}
                    onChange={handleCompanyChange}
                  >
                    {companies.map((company) => (
                      <MenuItem key={company._id} value={company._id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                fullWidth
                margin="normal"
                label="Company Name"
                name="name"
                value={newCompany.name}
                onChange={handleNewCompanyChange}
                className="col-span-1"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Industry"
                name="industry"
                value={newCompany.industry}
                onChange={handleNewCompanyChange}
                className="col-span-1"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Website"
                name="website"
                value={newCompany.website}
                onChange={handleNewCompanyChange}
                className="col-span-1"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                name="address"
                value={newCompany.address}
                onChange={handleNewCompanyChange}
                className="col-span-1"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contact Email"
                name="contactEmail"
                value={newCompany.contactEmail}
                onChange={handleNewCompanyChange}
                className="col-span-1"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contact Phone"
                name="contactPhone"
                value={newCompany.contactPhone}
                onChange={handleNewCompanyChange}
                className="col-span-1"
              />
              <div className="col-span-1 md:col-span-2 mt-4">
                <Typography variant="subtitle1" className="mb-2 text-gray-700">
                  Upload Company Logo
                </Typography>
                <ImageUpload setimg={handleLogoUpload} />
              </div>
              <div className="col-span-1 md:col-span-2 mt-4">
                <Typography variant="subtitle1" className="mb-2 text-gray-700">
                  Upload Background Picture
                </Typography>
                <ImageUpload setimg={handleBackgroundUpload} />
              </div>
            </div>
          )}
          <Button
            type="submit"
            variant="contained"
            className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
