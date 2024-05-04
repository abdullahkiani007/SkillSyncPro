import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import hero from "./assets/hero.svg";
import Features from "./Components/Features";
import Banner from "./Components/Banner";
import FAQ from "./Components/FAQ";
import Footer from "./Components/Footer";
// import logo from "./assets/logo-no-background.png"
function App() {
  const faqs = [
    {
      question: "What is SkillSync Pro?",
      answer:
        "SkillSync Pro is the ultimate platform for skill development and talent acquisition. It is a one-stop solution for job seekers, employers, and recruiters to connect and collaborate.",
    },
    {
      question: "How can I get started with SkillSync Pro?",
      answer:
        "Getting started with SkillSync Pro is easy. Simply sign up on our platform and start exploring the features. You can create a profile, search for jobs, and connect with employers in just a few clicks.",
    },
    {
      question: "Is SkillSync Pro free to use?",
      answer:
        "Yes, SkillSync Pro is free to use for job seekers and candidates. Employers and recruiters can sign up for a premium account to access advanced features and services.",
    },
    {
      question: "How can I contact the support team?",
      answer:
        "If you have any questions or need assistance, you can contact our support team via email at support.skillSync@gmail.com"
    }
  ];


  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row  mx-10 items-center justify-center md:items-start  ">
        <div className="mt-28 md:mt-48 md:ml-32">
          <h1 className="text-5xl md:text-7xl font-bold">
            Welcome to the <br></br>{" "}
            <span className="text-primary">SkillSync Pro</span>
          </h1>
          <p className="text-xl my-10">
            The ultimate platform for skill development and talent acquisition.
          </p>
          <a
            href="#"
            className="bg-primary text-white text-lg font-bold px-20 py-3 rounded-xl mt-5"
          >
            Get Started
          </a>
        </div>

        <div className="mt-10 ">
          <img src={hero} alt="hero" className="mt-2 min-h-[36rem] md:min-h-[40rem]" />
        </div>
      </div>

      <Features/>
      <Banner/>
      <FAQ/>
      <Footer/> 
     
      
      

    </div>
  );
}

export default App;
