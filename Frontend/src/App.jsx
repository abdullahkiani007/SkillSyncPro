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
import { motion , AnimatePresence} from "framer-motion";
import Login from "./Components/landingpage/Login";

import { useState } from "react";
import Modal from "./Components/landingpage/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const open = () => {
    setModalOpen(true);
    document.body.classList.add('no-scroll');
  }
  
  const close = () => {
    setModalOpen(false);
    document.body.classList.remove('no-scroll');
  }

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div
        id="#"
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

            <AnimatePresence
            initial= {false}
            mode='wait'
            >
          {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}

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

      <div
      // className="bg-secondary-dark"
      >
        <Features />
      </div>
      <Banner />
      <FAQ />
      <Footer />
    </div>
    // <Login/>
  );
}

export default App;
