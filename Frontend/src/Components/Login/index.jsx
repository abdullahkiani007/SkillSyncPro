import React, { useState } from "react";
import { Facebook, GitHub, Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { Formik, useFormik } from "formik";
import loginSchema from "../../Schemas/Login/loginSchema";
import Controller from "../../API/index";
import Loader from "../Loader/Loader";

const Login = ({ role }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = window.location.pathname.split("/")[2];
  const [path, setPath] = useState(route);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  const handleInputChange = (e) => {
    setError("");
    console.log(error);
    handleChange(e);
  };

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

  const handleClick = async () => {
    setLoading(true);
    const data = {
      email: values.email,
      password: values.password,
      role,
    };
    try {
      const response = await Controller.login(data);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log(response.data);

        dispatch(
          login({
            _id: response.data.user.id,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.email,
            auth: true,
            role: response.data.user.role,
          })
        );

        navigate(`/${response.data.user.role}/Dashboard`);
      } else {
        setError(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
      <main className="flex flex-col md:flex-row items-center w-full px-2 md:px-20 lg:px-96">
        <div className="flex md:inline-flex flex-col justify-center items-center md:items-start flex-1 space-y-1">
          <p className="text-2xl md:text-6xl text-primary font-bold">
            SkillSync Pro
          </p>
          <p className="font-medium text-lg leading-1 m-2 text-secondary-dark">
            {role === "jobseeker"
              ? "Unlock Your Potential, Land Your Dream Job with SkillSync Pro!"
              : "Streamline Hiring, Unleash Success with SkillSync Pro!"}
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary text-white text-lg font-bold w-24 md:w-40 py-3 rounded-xl my-5"
            >
              Home
            </motion.button>
          </Link>
        </div>
        <motion.div
          className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-96 items-center max-w-4xl"
          variants={dropIn}
          initial="hidden"
          animate="visible"
        >
          <h2 className="p-3 text-xl md:text-3xl font-bold text-primary">
            SkillSync Pro
          </h2>
          <div className="inline-block border-[1px] justify-center w-20 border-primary border-solid"></div>
          <h3 className="text-lg md:text-xl font-semibold text-primary pt-2">
            Sign In!
          </h3>
          <div className="flex flex-col items-center justify-center">
            <input
              name="email"
              type="email"
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-primary m-1 focus:shadow-md focus:border-secondary-dark focus:outline-none focus:ring-0"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="Email"
              error={errors.email && touched.email ? 1 : undefined}
            />
            {errors.email && touched.email && (
              <p className="text-red-700"> {errors.email}</p>
            )}
            <input
              name="password"
              type="password"
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-primary m-1 focus:shadow-md focus:border-secondary-dark focus:outline-none focus:ring-0"
              placeholder="Password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleInputChange}
              error={errors.password && touched.password ? 1 : undefined}
            />
            {errors.password && touched.password && (
              <p className="text-red-700"> {errors.password}</p>
            )}
            {error && <p className="text-red-700 h-5">{error}</p>}
            <button
              className="rounded-2xl m-2 text-white bg-primary w-fit px-4 py-2 shadow-md hover:text-primary hover:bg-white transition duration-200 ease-in disabled:bg-primary disabled:opacity-70 disabled:text-white"
              onClick={handleClick}
              disabled={errors.email || errors.password}
            >
              Sign In
            </button>
          </div>
          <div className="inline-block border-[1px] justify-center w-20 border-primary border-solid"></div>
          <p className="text-primary mt-4 text-sm">Don't have an account?</p>
          <Link
            to={`/signup/${path}`}
            className="text-primary mb-4 text-sm font-medium cursor-pointer hover:underline"
            onClick={() => setIsLogin(false)}
          >
            Create a New Account?
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
