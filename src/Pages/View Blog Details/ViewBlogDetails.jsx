import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';

const ViewBlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: blog = {}, isLoading, isError } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blog/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="h-screen flex justify-center items-center"><span className="loading loading-bars loading-lg text-[#1e40af]"></span></div>;

    if (isError) return <div className="py-20 text-center text-red-500 font-bold">Blog not found!</div>;

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header Section with boro Image */}
            <div className="relative h-[450px] w-full">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                    <div className="container mx-auto px-6 pb-12">
                        <motion.button
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-white mb-6 hover:text-blue-300 transition-colors font-semibold"
                        >
                            <FaArrowLeft /> Back to Blogs
                        </motion.button>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-5xl leading-tight"
                        >
                            {blog.title}
                        </motion.h1>
                    </div>
                </div>
            </div>

            {/* Content Section - Centered and Slim for better Readability */}
            <div className="container mx-auto px-6 -mt-10 relative z-10">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto border border-gray-50"
                >
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 mb-10 pb-6 border-b border-gray-100 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <FaUser className="text-[#1e40af]" />
                            <span className="font-bold text-gray-800">{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-[#1e40af]" />
                            <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTag className="text-[#1e40af]" />
                            <span className="bg-blue-50 text-[#1e40af] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                                {blog.category}
                            </span>
                        </div>
                    </div>

                    {/* Blog Content Body */}
                    <article className="prose prose-blue prose-lg max-w-none">
                        <p className="text-xl md:text-2xl font-medium text-gray-600 mb-8 leading-relaxed italic border-l-4 border-[#1e40af] pl-6">
                            {blog.excerpt}
                        </p>

                        <div className="text-gray-700 leading-8 space-y-6">
                            <p>
                                Applying for international scholarships is one of the most significant steps for any student's academic career.
                                Beyond the financial relief, it offers a sense of accomplishment and recognition.
                                To succeed in this competitive field, one must understand the nuances of the application process.
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900 mt-10">Why This Scholarship Matters?</h2>
                            <p>
                                Most scholarships require a strong academic record, but your extracurricular involvement and leadership skills are just as important.
                                Selection committees look for well-rounded individuals who can contribute to their community.
                                Make sure to showcase your unique experiences in your application essay.
                            </p>

                            <p>
                                Researching the specific requirements of each university is key. Some may require a high IELTS score, while others focus more on your research proposal.
                                Always double-check deadlines and ensure all your documents are certified and translated if necessary.
                            </p>

                            <blockquote className="bg-blue-50 p-6 rounded-xl border-l-8 border-[#1e40af] my-10 font-semibold text-gray-800">
                                "The secret of getting ahead is getting started. Don't wait for the perfect moment; take the moment and make it perfect."
                            </blockquote>

                            <p>
                                In conclusion, your scholarship journey is a marathon, not a sprint.
                                Stay organized, keep track of your applications, and never lose hope.
                                Every rejection is a step closer to a successful acceptance.
                            </p>
                        </div>
                    </article>
                </motion.div>
            </div>
        </div>
    );
};

export default ViewBlogDetails;