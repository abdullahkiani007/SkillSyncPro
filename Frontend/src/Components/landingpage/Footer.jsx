import React from "react";
import Section from "./Section";


const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className=" ">
        <p className="text-center text-n-4 ">
          © {new Date().getFullYear()}. All rights reserved.
        </p>

        
      </div>
    </Section>
  );
};

export default Footer;
