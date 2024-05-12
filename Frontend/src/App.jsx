import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./Components/landingpage/Navbar";
import hero from "./assets/hero.svg";
import Features from "./Components/landingpage/Features";
import Banner from "./Components/landingpage/Banner";
import FAQ from "./Components/landingpage/FAQ/FAQ";
import Footer from "./Components/landingpage/Footer";
import Reveal from "./Components/landingpage/Reveal";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Components/landingpage/Login";

import { useState } from "react";
import Modal from "./Components/landingpage/Modal";
import Benefits from "./Components/landingpage/Benefits";
import Header from "./Components/landingpage/Header";


function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const open = () => {
    setModalOpen(true);
    document.body.classList.add("no-scroll");
  };

  const close = () => {
    setModalOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <div>
      {/* <Navbar />
       */}
       <Header/>

      {/* Hero Section */}
      <div
        id="hero"
        className="flex flex-col md:flex-row pt-24 mx-10 items-center justify-center md:items-start  "
      >
        <div className="mt-28 md:mt-48 md:ml-32">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-bold">
              Welcome to the <br></br>{" "}
              <span className="text-primary">SkillSync Pro</span>
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-xl my-10">
              The ultimate platform for skill development and talent
              acquisition.
            </p>
          </Reveal>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              modalOpen ? close() : open();
            }}
            className="bg-primary text-white text-lg font-bold px-20 py-3 rounded-xl mt-5"
          >
            Get Started
          </motion.button>

          <AnimatePresence initial={false} mode="wait">
            {modalOpen && (
              <Modal modalOpen={modalOpen} handleClose={close}>
                <h1 className="font-bold text-lg">SkillSync Pro</h1>
                <div className="flex flex-col justify-center align-center pt-4 pb-10">
                <Link to="/login/jobseeker">
                  <motion.button
                    className="bg-secondary-dark p-2 rounded-lg my-2 w-40"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={close}
                  >
                   I'm a Job Seeker
                  </motion.button>
                  </Link>
                  <Link to={"/login/employer"} className="w-full">
                  <motion.button
                    className="bg-secondary-dark p-2 rounded-lg my-2 w-40" 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    I want to hire
                  </motion.button>
                  </Link>
                </div>
                <p className="underline hover:cursor-pointer">
                  Already have an account?
                </p>
              </Modal>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 ">
          <Reveal>
            <img
              src={hero}
              alt="hero"
              className="mt-2 min-h-[36rem] md:min-h-[40rem]"
            />
          </Reveal>
        </div>
      </div>



      <Banner />
      <div
      id="services"
      // className="bg-secondary-dark"
      >
        <Features />
      </div>
      <div id="features">
     <Benefits />
      </div>
      <FAQ />
      <Footer />
    </div>
    // <Login/>
  );
}

export default App;
