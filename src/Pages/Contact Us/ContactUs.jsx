import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import SectionHeading from '../../Component/Shared/SectionHeading';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent successfully.',
                    icon: 'success',
                    confirmButtonColor: '#1e40af',
                });
                e.target.reset();
            }, (error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    confirmButtonColor: '#1e40af',
                });
            });
    };

    return (
        <div className="bg-white min-h-screen">
            <section className="my-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <SectionHeading title="Contact Us"></SectionHeading>
                    <p className="opacity-80 text-center -mt-5 px-4">
                        Have questions? We're here to help you navigate your scholarship journey.
                    </p>
                </motion.div>
            </section>

            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-12">

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-[#1e40af] mb-4">Get in Touch</h2>
                            <p className="text-gray-600">
                                Reach out to our support team for any queries regarding scholarship applications,
                                university partnerships, or technical issues.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-[#1e40af]">
                                    <FaPhoneAlt size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Phone Number</h4>
                                    <p className="text-gray-600">+880 1234 567 890</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-[#1e40af]">
                                    <FaEnvelope size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Email Address</h4>
                                    <p className="text-gray-600">support@scholarstream.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-[#1e40af]">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Office Location</h4>
                                    <p className="text-gray-600">Level 4, Science Lab Road, Dhanmondi, Dhaka</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Subject Field Removed */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold mb-1">Your Name</label>
                                    <input name="user_name" required type="text" placeholder="John Doe" className="p-3 border rounded-lg focus:outline-[#1e40af]" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-semibold mb-1">Your Email</label>
                                    <input name="user_email" required type="email" placeholder="john@example.com" className="p-3 border rounded-lg focus:outline-[#1e40af]" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-semibold mb-1">Message</label>
                                <textarea name="message" required rows="6" placeholder="How can we help you?" className="p-3 border rounded-lg focus:outline-[#1e40af] resize-none"></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-[#1e40af] text-white py-3 rounded-lg font-bold shadow-md transition-colors hover:bg-blue-800"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;