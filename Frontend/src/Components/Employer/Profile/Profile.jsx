import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ProfileForm from "./ProfileForm";
import Controller from "../../../API/index";
import Loader from "../../Loader/Loader";
import { ArrowBack } from "@mui/icons-material";
import imageplaceholder from "../../../assets/placeholderImage_person.jpg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [userData, setNewUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await Controller.getEmpProfile(token);

        if (response.status === 200) {
          setLoading(false);
          const userData = response.data.employer;
          console.log(userData);
          setNewUser(userData);
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full min-h-screen p-5 bg-gradient-to-r from-primary to-secondary-dark flex flex-col items-center justify-center">
      <div className="w-full lg:w-2/3 bg-white shadow-2xl rounded-3xl px-8 pt-10 pb-8 mb-4 relative">
        <ArrowBack
          sx={{
            cursor: "pointer",
            fontSize: "30px",
            color: "#6B7280",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
          onClick={() => navigate(-1)}
        />
        <h1 className="font-bold text-3xl text-gray-700 bg-primary  bg-clip-text text-transparent tracking-wide text-center">
          Profile Management
        </h1>
        {/* Profile Picture */}
        <div className="relative flex justify-center mt-10">
          <img
            src={userData?.user?.profilePicture || imageplaceholder}
            alt="profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg hover:scale-110 transform transition-transform duration-300"
          />
        </div>
        {/* Personal Info Form */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold bg-secondary-dark text-transparent bg-clip-text">
            Personal Information
          </h2>
          <div className="bg-gray-50 mt-5 shadow-xl rounded-lg p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={userData?.user?.firstName || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={userData?.user?.lastName || ""}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={userData?.user?.email || ""}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={userData?.user?.phone || "Not Provided"}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>
              {/* Address */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={userData?.user?.address || "Not Provided"}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Edit Profile Button */}
        <div className="mt-10 text-center">
          <Button
            className="w-full bg-gradient-to-r from-primary to-secondary-dark text-white py-3 rounded-full shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-100 hover:from-secondary-dark hover:to-primary"
            variant="contained"
            onClick={() => {
              localStorage.setItem("profile", JSON.stringify(userData));
              navigate("./edit");
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
