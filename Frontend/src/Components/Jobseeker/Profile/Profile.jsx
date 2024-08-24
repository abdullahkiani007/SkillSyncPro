import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ProfileForm from "./ProfileForm";
import Controller from "../../../API/index";
import Loader from "../../Loader/Loader";
import { ArrowBack } from "@mui/icons-material";
import imageplaceholder from "../../../assets/placeholderImage_person.jpg";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  // get user from redux store
  const user = useSelector((state) => state.user);
  const [readMode, setreadMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userData, setNewUser] = useState(null); // Add this line
  const navigate = useNavigate();
  const path = window.location.pathname.split("/").pop();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await Controller.getProfile(token);

        if (response.status === 200) {
          setLoading(false);
          const { response: userData } = response.data;
          console.log("data", userData);

          //   format education date
          userData.education = userData.education.map((edu) => ({
            ...edu,
            startDate: new Date(edu.startDate).toLocaleDateString("en-GB"),
            endDate: new Date(edu.endDate).toLocaleDateString("en-GB"),
          }));
          setNewUser(userData); // Add this line
          console.log(userData);
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, []);

  //   useEffect(() => {

  //   }, [newUser]);

  // Use newUser in your component
  // ...

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full mt-0 p-5 bg-gray-100  pt-10 flex flex-col ">
      <div className="flex flex-row  item-center">
        <div>
          <ArrowBack
            sx={{
              cursor: "pointer",
              fontSize: "20px",
              marginRight: "10px",
            }}
          />
        </div>
        <h1 className="font-bold text-xl mb-5 ">Profile management</h1>
      </div>
      {/* // Display user info */}
      <div className="mt-20 w-full lg:w-2/3 h-full  bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-auto">
        <img
          src={userData.user.profilePicture}
          alt="profile"
          className="w-24 h-24 object-cover
            rounded-full mb-5 absolute -translate-y-20"
        />
        <div className="mt-10  ">
          <h1 className="text-secondary-dark text-lg font-bold">
            Personal Info
          </h1>
          <div className="bg-white mt-5 shadow-2xl rounded-lg py-2 pb-4 px-4">
            <div>
              <h1 className="font-bold text-lg text-gray-600">First Name</h1>
              <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200 ">
                {userData.user.firstName}
              </p>
            </div>

            <div className="mt-3">
              <h1 className="font-bold text-lg text-gray-600">Last Name</h1>
              <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200 ">
                {userData.user.lastName}
              </p>
            </div>
            <div className="mt-3">
              <h1 className="font-bold text-lg text-gray-600">Email</h1>
              <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200 ">
                {userData.user.email}
              </p>
            </div>
            <div className="mt-3">
              <h1 className="font-bold text-lg text-gray-600">Phone</h1>
              <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200 ">
                {userData.user.phone || "Not Provided"}
              </p>
            </div>
            <div className="mt-3">
              <h1 className="font-bold text-lg text-gray-600">Address</h1>
              <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200 ">
                {userData.address || "Not Provided"}
              </p>
            </div>
          </div>
          {/* Education */}
          <div className="mt-5">
            <h1 className="font-bold text-lg text-secondary-dark ">
              Education
            </h1>
            {userData.education.length > 0 ? (
              userData.education.map((edu, index) => (
                <div
                  key={index}
                  className="mt-3  bg-white shadow-2xl rounded-lg px-4 py-2 pb-4"
                >
                  <div className="">
                    <h1 className="font-bold text-lg text-gray-600">Degree</h1>
                    <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200 ">
                      {edu.degree}
                    </p>
                  </div>

                  <div className="mt-3">
                    <h1 className="font-bold text-lg text-gray-600">
                      Institution
                    </h1>
                    <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200 ">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="mt-3">
                    <h1 className="font-bold text-lg text-gray-600">Date</h1>
                    <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200 ">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No Education Provided</p>
            )}
          </div>
          {/* Skills */}
          <div className="mt-5">
            <h1 className="font-bold text-lg text-secondary-dark ">Skills</h1>
            <div className="flex flex-wrap ">
              {userData.skills.length > 0 ? (
                userData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="mt-3 mr-4 bg-secondary-dark text-white  shadow-2xl rounded-2xl px-4 py-2 
                       hover:scale-105 hover:bg-white hover:text-secondary-dark
                       transform transition ease-in-out duration-300
                      w-fit flex items-center"
                  >
                    <p className=" font-bold ">{skill}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No Skills Provided</p>
              )}
            </div>
          </div>
        </div>
        <div className=" mt-20">
          <Button
            className="ml-20"
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

{
  /* <ProfileForm
          setreadMode={setreadMode}
          formData={newUser}
          setFormData={setNewUser}
        /> */
}
