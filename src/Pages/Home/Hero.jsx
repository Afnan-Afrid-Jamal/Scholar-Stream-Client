import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import heroImg from "../../assets/HeroImg.png"
import { FaSearch } from "react-icons/fa";

const Hero = () => {
    return (
        <section className="bg-base-100 py-16 md:py-24">
            <div className="max-w-11/12 mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* LEFT CONTENT */}
                <div className="flex-1 space-y-6">

                    {/* Animated Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight"
                    >
                        Find Scholarships<br />That Match Your Dreams
                    </motion.h1>

                    {/* Animated Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-neutral/70 max-w-md text-lg"
                    >
                        Discover scholarships from world-class universities — all in one place.
                        Search, apply, and make your academic journey successful.
                    </motion.p>

                    {/* Animated Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link to="/all-scholarships" className="btn btn-primary px-6 text-lg text-white">
                            <FaSearch></FaSearch>
                            Search Scholarship
                        </Link>
                    </motion.div>
                </div>

                {/* RIGHT IMAGE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="flex-1"
                >
                    <img
                        src={heroImg}
                        className="w-full max-w-md mx-auto drop-shadow-lg rounded-xl"
                        alt="Scholarship illustration"
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
