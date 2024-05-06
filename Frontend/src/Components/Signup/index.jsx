import React, { useState } from "react";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignUpForm = () => {
  const route = window.location.pathname.split("/")[2];
  const [path,setPath] = useState(route);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
      <main className="flex flex-col md:flex-row  items-center w-full px-2 md:px-20 lg:px-96">
        <div className="flex md:inline-flex flex-col justify-center items-center md:items-start flex-1 space-y-1">
          <p className=" text-2xl md:text-6xl text-primary font-bold">
            SkillSync Pro
          </p>
          <p className="font-medium text-lg leading-1 m-2 text-center text-secondary-dark">
            Unlock Your Potential, Land Your Dream Job with SkillSync Pro!
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary text-white text-lg font-bold w-24 md:w-40  py-3 rounded-xl my-5 "
            >
              Home
            </motion.button>
          </Link>
        </div>
        <motion.div
          className="bg-primary text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-96 items-center max-w-4xl  "
          variants={dropIn}
          initial="hidden"
          animate="visible"
        >
          <h2 className="p-3 text-3xl font-bold text-white">SkillSync Pro</h2>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <h3 className="text-xl font-semibold text-white pt-2">
            Create Account!
          </h3>
          <div className="flex space-x-2 m-4 items-center justify-center">
            <div className="socialIcon border-white">
              <Facebook className="text-white" />
            </div>
            <div className="socialIcon border-white">
              <GitHub className="text-white" />
            </div>
            <div className="socialIcon border-white">
              <Google className="text-white" />
            </div>
          </div>
          {/* Inputs */}
          <div className="flex flex-col items-center justify-center mt-2">
            <input
              type="text"
              className="text-black rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            ></input>
            <input
              type="email"
              className="text-black rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <input
              type="password"
              className="text-black rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <button
              className="rounded-2xl m-4 text-primary bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-primary transition duration-200 ease-in"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <p className="text-white mt-4 text-sm">Already have an account?</p>
          <Link
            className="text-white mb-4 text-sm font-medium cursor-pointer hover:underline"
            to={`/login/${path}`}
          >
            Sign In to your Account?
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default SignUpForm;
