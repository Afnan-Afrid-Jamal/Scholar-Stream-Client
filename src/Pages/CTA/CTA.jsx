import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <div>
            <section
                className="py-20 text-center bg-cover bg-center relative rounded-b-4xl mt-8"
                style={{ backgroundImage: `url('https://i.ibb.co.com/cS5gWz8P/Gemini-Generated-Image-ap05epap05epap05-removebg-preview.png')` }}
            >
                {/* Overlay to make text readable */}
                <div className="absolute inset-0 bg-black/50 opacity-80 rounded-b-4xl"></div>

                <div className="relative z-10 text-white"> {/* Text needs to be above the overlay */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to find your scholarship?</h2>
                    <Link to="/all-scholarships">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#1e40af] px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            Explore Scholarships
                        </motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CTA;