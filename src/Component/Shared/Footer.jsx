import React from 'react';
import logo from '../../../public/Logo.png';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-secondary text-white py-12 mt-20">
            <div className="max-w-11/12 mx-auto">

                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row lg:flex-row justify-around items-center pb-10 border-b border-white/20">

                    {/* LOGO */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src={logo} alt="logo" className="w-12 h-12 border-2 border-white rounded-full" />
                            <h2 className="text-2xl font-bold border-white border-y-2 px-2">
                                SCHOLAR STREAM
                            </h2>
                        </div>

                        <p className="opacity-80 text-sm mb-5">
                            Connecting students with the best scholarship opportunities worldwide.
                        </p>


                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-1 w-max">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 opacity-90">
                            <li><Link className="hover:text-accent transition">Home</Link></li>
                            <li><Link className="hover:text-accent transition">All Scholarships</Link></li>
                            <li><Link className="hover:text-accent transition">Dashboard</Link></li>
                            <li><Link className="hover:text-accent transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-1 w-max">
                            Support
                        </h3>
                        <ul className="space-y-2 opacity-90">
                            <li><Link className="hover:text-accent transition">FAQ</Link></li>
                            <li><Link className="hover:text-accent transition">Privacy Policy</Link></li>
                            <li><Link className="hover:text-accent transition">Terms of Service</Link></li>
                            <li><Link className="hover:text-accent transition">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Social */}

                    <div className="flex gap-5 text-2xl">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition"
                        >
                            <FaTwitter />
                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition"
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>



                </div>

                {/* BOTTOM COPYRIGHT */}
                <div className="text-center pt-6">
                    <p className="text-sm opacity-80">
                        © {new Date().getFullYear()} Scholar Stream — All Rights Reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
