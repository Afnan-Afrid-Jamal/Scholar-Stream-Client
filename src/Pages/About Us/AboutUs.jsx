import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import SectionHeading from '../../Component/Shared/SectionHeading';

const AboutUs = () => {
    return (
        <div className="bg-white text-gray-800 max-w-11/12 mx-auto my-20">
            {/* Hero Section */}
            <section className="">
                <div className="container mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        <SectionHeading title="Empowering Your Educational Journey" />
                    </motion.h1>
                    <p className="text-md opacity-90 max-w-2xl mx-auto">
                        ScholarStream is dedicated to bridging the gap between ambitious students and
                        their dream education through a streamlined scholarship process.
                    </p>
                </div>
            </section>

            {/* Our Mission & Vision */}
            <section className="py-16 container mx-auto px-6 my-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-[#1e40af] mb-4">Our Mission</h2>
                        <p className="leading-relaxed mb-6">
                            At ScholarStream, our mission is to simplify the complex world of financial aid.
                            We believe that financial constraints should never be a barrier to quality education.
                            Our platform centralizes global opportunities, making them accessible to every student
                            with just a few clicks.
                        </p>
                        <h2 className="text-3xl font-bold text-[#1e40af] mb-4">Our Vision</h2>
                        <p className="leading-relaxed">
                            To become the world's most trusted scholarship ecosystem where universities
                            and students connect seamlessly, fostering a future built on talent and merit.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-gray-100 p-8 rounded-2xl border-l-8 border-[#1e40af]"
                    >
                        <h3 className="text-xl font-bold mb-4">Why ScholarStream?</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <span className="bg-[#1e40af] text-white p-1 rounded-full mr-3">✓</span>
                                Verified University Scholarships
                            </li>
                            <li className="flex items-center">
                                <span className="bg-[#1e40af] text-white p-1 rounded-full mr-3">✓</span>
                                Real-time Application Tracking
                            </li>
                            <li className="flex items-center">
                                <span className="bg-[#1e40af] text-white p-1 rounded-full mr-3">✓</span>
                                Secure Payment Integration (Stripe)
                            </li>
                            <li className="flex items-center">
                                <span className="bg-[#1e40af] text-white p-1 rounded-full mr-3">✓</span>
                                Direct Feedback from Moderators
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>


            {/* Stats Section */}
            <section className=" py-16 rounded-t-4xl border-2 border-blue-500 my-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-bold text-[#1e40af]">500+</h3>
                            <p className="text-gray-600">Scholarships</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-[#1e40af]">10k+</h3>
                            <p className="text-gray-600">Global Students</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-[#1e40af]">150+</h3>
                            <p className="text-gray-600">Universities</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold text-[#1e40af]">$2M+</h3>
                            <p className="text-gray-600">Aid Distributed</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Call to Action */}
            <section className="py-20 text-center bg-blue-200 border-2 border-blue-500 rounded-b-4xl mt-8">
                <h2 className="text-3xl font-bold mb-6">Ready to find your scholarship?</h2>
                <Link to="/all-scholarships">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#1e40af] text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
                    >
                        Explore Scholarships
                    </motion.button>
                </Link>
            </section>
        </div>
    );
};

export default AboutUs;