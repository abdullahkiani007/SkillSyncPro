import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Controller from "../../../API/index";
import ImageUpload from "../../Uploader/ImageUploader";
import placeholderImage_person from "../../../assets/placeholderImage_person.jpg";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
const ProfileForm = () => {
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState({});
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [edu, setEdu] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profile"));
    setUser(data.user);
    delete data.user;
    setFormData(data);
    // const education = data.education.map((edu) => {
    //   console.log(edu.endDate, typeof edu.endDate);
    //   console.log(edu.startDate, typeof edu.startDate);

    //   return {
    //     ...edu,
    //     startDate: new Date(edu.startDate.trim()).toLocaleDateString("en-GB"),
    //     endDate: new Date(edu.endDate.trim()).toLocaleDateString("en-GB"),
    //   };
    // });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleUserChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSkillChange = (selectedOptions) => {
    const skills = selectedOptions.map((option) => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills,
    }));
  };

  const handleEduChange = (e) => {
    const { name, value } = e.target;
    setEdu((prevEdu) => ({
      ...prevEdu,
      [name]: value,
    }));
  };
  const formatDate = (date) => {
    return date ? format(new Date(date), "yyyy/MM/dd") : "";
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const formattedDate = value ? format(new Date(value), "yyyy/MM/dd") : "";
    handleEduChange({ target: { name, value: formattedDate } });
  };

  const addEducation = () => {
    const formattedEdu = {
      ...edu,
      startDate: new Date(edu.startDate),
      endDate: new Date(edu.endDate),
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: [...prevFormData.education, formattedEdu],
    }));
    setEdu({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: updatedEducation,
    }));
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "Express", label: "Express" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "SQL", label: "SQL" },
  ];

  const handleSubmit = async () => {
    user.profilePicture =
      img ||
      user.profilePicture ||
      "https://res.cloudinary.com/ddl8sa4zy/image/upload/v1722860252/placeholderImage_person_tvhrx5.jpg";
    const token = localStorage.getItem("token");

    try {
      let updatedData = {
        ...formData,
        user,
      };

      console.log(updatedData);
      const response = await Controller.updateProfile(token, updatedData);
      if (response.status === 200) {
        console.log(response);
        navigate("/jobseeker/profile");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-white p-3">
      <div className="flex items-center">
        <img
          src={img || placeholderImage_person}
          alt="profile"
          className="w-24 h-24 rounded-full mb-5 object-cover"
        />
        <div className="ml-10">
          <ImageUpload setimg={setImg} />
        </div>
      </div>
      <TextField
        label="First Name"
        name="firstName"
        variant="outlined"
        value={user.firstName}
        className="w-full"
        onChange={handleUserChange}
        sx={{ mt: "2rem", backgroundColor: "white" }}
      />

      <TextField
        label="Last Name"
        name="lastName"
        variant="outlined"
        value={user.lastName}
        className="w-full"
        onChange={handleUserChange}
        sx={{ mt: "2rem", backgroundColor: "white" }}
      />
      <TextField
        label="Phone"
        name="phone"
        variant="outlined"
        value={user.phone}
        className="w-full"
        onChange={handleUserChange}
        sx={{ mt: "2rem", backgroundColor: "white" }}
      />
      <TextField
        label="Address"
        name="address"
        variant="outlined"
        value={user.address}
        className="w-full"
        onChange={handleUserChange}
        sx={{ mt: "2rem", backgroundColor: "white" }}
      />
      <div className="mt-10">
        <h2>Skills</h2>
        <CreatableSelect
          isMulti
          options={options}
          value={
            formData.skills &&
            formData.skills.map((skill) => ({
              value: skill,
              label: skill,
            }))
          }
          onChange={handleSkillChange}
        />
      </div>
      <div className="mt-10">
        <h2>Education</h2>
        {formData.education &&
          formData.education.map((edu, index) => {
            return (
              <div
                key={index}
                className="mt-3 bg-white shadow-2xl rounded-lg px-4 py-2 pb-4"
              >
                <div>
                  <h1 className="font-bold text-lg text-gray-600">Degree</h1>
                  <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200">
                    {edu.degree}
                  </p>
                </div>
                <div className="mt-3">
                  <h1 className="font-bold text-lg text-gray-600">
                    Institution
                  </h1>
                  <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200">
                    {edu.institution}
                  </p>
                </div>
                <div className="mt-3">
                  <h1 className="font-bold text-lg text-gray-600">Date</h1>
                  <p className="border-2 rounded-lg text-gray-500 px-3 py-2 border-gray-200">
                    {new Date(edu.startDate).toLocaleDateString()} -{" "}
                    {new Date(edu.endDate).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeEducation(index)}
                  sx={{ mt: "1rem" }}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        <div className="mb-4">
          <TextField
            label="Institution"
            name="institution"
            variant="outlined"
            value={edu.institution}
            className="w-full"
            onChange={handleEduChange}
            sx={{ mt: "1rem", backgroundColor: "white" }}
          />
          <TextField
            label="Degree"
            name="degree"
            variant="outlined"
            value={edu.degree}
            className="w-full"
            onChange={handleEduChange}
            sx={{ mt: "1rem", backgroundColor: "white" }}
          />
          <TextField
            label="Field of Study"
            name="fieldOfStudy"
            variant="outlined"
            value={edu.fieldOfStudy}
            className="w-full"
            onChange={handleEduChange}
            sx={{ mt: "1rem", backgroundColor: "white" }}
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            variant="outlined"
            value={edu.startDate}
            className="w-full"
            InputLabelProps={{ shrink: true }}
            onChange={handleEduChange}
            sx={{ mt: "1rem", backgroundColor: "white" }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            variant="outlined"
            value={edu.endDate}
            className="w-full"
            InputLabelProps={{ shrink: true }}
            onChange={handleEduChange}
            sx={{ mt: "1rem", backgroundColor: "white" }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={addEducation}
          sx={{ mt: "1rem" }}
        >
          Add Education
        </Button>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: "2rem" }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/jobseeker/profile")}
        sx={{ mt: "2rem", ml: "1rem" }}
      >
        Cancel
      </Button>
    </div>
    // <h1>hello</h1>
  );
};

export default ProfileForm;
