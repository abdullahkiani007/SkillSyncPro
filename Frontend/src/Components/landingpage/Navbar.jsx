import React, { useState } from 'react';
import logo from "../../assets/logo-no-background.png";
import Reveal from './Reveal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex py-10 px-10 md:px-40  bg-white  w-full justify-between items-center  z-10 fixed" >
            {/* Logo */}
            <div className="flex items-center">
                <img src={logo} alt="logo" className="h-12 hidden md:block" />
                <h1 className="md:hidden text-primary text-xl font-bold">SkillSync Pro</h1>
            </div>

            {/* Hamburger Menu Icon */}
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary text-2xl focus:outline-none">
                    {isMenuOpen ? (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Nav Links */}
            
            <ul className={`md:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row md:items-center absolute md:static top-full left-0 md:left-auto md:top-auto bg-white border rounded-md shadow-md py-2 md:py-0 md:shadow-none md:border-none w-full md:w-auto`}>
                <li className=" pl-10 md:p-2 md:px-8 rounded-lg my-2 md:my-0 font-bold  text-primary hover:bg-primary hover:text-white">
                    <a href="#">Home</a>
                </li>
                <li className=" pl-10 md:p-2 md:px-8 rounded-lg my-2 md:my-0 font-bold  text-primary hover:bg-primary hover:text-white">
                    <a href="#feature">Feature</a>
                </li>
                <li className=" pl-10 md:p-2  md:px-8 rounded-lg my-2 md:my-0 font-bold  text-primary hover:bg-primary hover:text-white">
                    <a href="#faq">FAQ</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
