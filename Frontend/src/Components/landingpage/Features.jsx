import React from "react";
import profile from "../../assets/profile.svg";
import resume from "../../assets/resume.jpeg";
import interview from "../../assets/interview.svg";
import skills from "../../assets/skills.jpg";
import Reveal from "./Reveal";
import "../../App.css"


const Features = () => {
  return (
    <div  className="backdrop-blur-md bg-opacity-30 py-20  lg:px-96 flex-col  glass" 
    // style={{
    //   background: 'rgba(255, 255, 255, 0.37)',
    //   borderRadius: '16px',
    //   boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    //   backdropFilter: 'blur(16px)',
    //   WebkitBackdropFilter: 'blur(16px)',
    //   border: '1px solid rgba(255, 255, 255, 0.34)',
    // }}
    >
      <h1 id="" className="text-center text-4xl font-bold text-secondary-dark">
        Why SkillSync Pro
      </h1>

      {/* First main card */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2  items-center justify-center">
          {/* Image */}
          <img
            src={profile}
            alt="Feature 1"
            className="h-72 rounded-full mx-auto md:mx-0"
          />
          <div className="text-center md:text-left">
            {/* Heading */}
            <h2 className="text-secondary-dark text-xl font-bold mb-2">User Profiling</h2>
            {/* Detail */}
            <p className="text-secondary-dark">
              Personalize user profiles for admins, employers, job seekers, and
              employers. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Illo, eaque aliquam. Fuga ut illum dolores minima, corporis
              voluptate ratione vel! Non mollitia, consequatur obcaecati iure
              quasi labore recusandae minus corrupti!
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
          {/* Image */}
          <div className="md:order-last flex justify-end">
            <img
              src={skills}
              alt="Feature 2"
              className="h-72 rounded-full mx-auto md:mx-0 "
            />
          </div>

          <div className="text-center  md:text-left">
            {" "}
            {/* Center align for small devices */}
            {/* Heading */}
            <h2 className="text-secondary-dark text-xl font-bold mb-2">
              Skills Anaylysis
            </h2>
            {/* Detail */}
            <p className="text-secondary-dark">
              Employers can create skill assessments and job seekers can
              demonstrate their skills. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ipsum, nulla? Ducimus aperiam sunt explicabo, eos
              quo numquam praesentium consequatur sapiente optio non quis
              perferendis soluta exercitationem enim cupiditate voluptatum
              nostrum.
            </p>
          </div>
        </div>
      </Reveal>

      {/* card 3 */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
          {/* Image */}
          <div className=" flex ">
            <img
              src={resume}
              alt="Feature 3"
              className="h-72 rounded-full mx-auto md:mx-0 "
            />
          </div>

          <div className="text-center  md:text-left">
            {/* Heading */}
            <h2 className="text-secondary-dark text-xl font-bold mb-2">
              Resume Management
            </h2>
            {/* Detail */}
            <p className="text-secondary-dark">
              Efficiently manage resumes, extract relevant information, and share
              with team members. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ad eligendi porro nihil commodi a praesentium,
              magni magnam quam nostrum nobis dicta rerum sint animi saepe dolor
              quasi corrupti maxime molestias?
            </p>
          </div>
        </div>
      </Reveal>

      {/* // card 4 */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
          {/* Image */}
          <div className="md:order-last flex justify-end">
            <img
              src={interview}
              alt="Feature 2"
              className="h-72 rounded-full mx-auto md:mx-0 "
            />
          </div>

          <div className="text-center  md:text-left">
            {" "}
            {/* Center align for small devices */}
            {/* Heading */}
            <h2 className="text-secondary-dark text-xl font-bold mb-2">
              Interview Management
            </h2>
            {/* Detail */}
            <p className="text-secondary-dark">
              Schedule, record, and analyze interviews to find the best candidates. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ipsum, nulla? Ducimus aperiam sunt explicabo, eos
              quo numquam praesentium consequatur sapiente optio non quis
              perferendis soluta exercitationem enim cupiditate voluptatum
              nostrum.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Features;
