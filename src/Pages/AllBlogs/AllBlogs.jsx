import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import SectionHeading from '../../Component/Shared/SectionHeading';

const AllBlogs = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6; // Proti page-e koita blog dekhaben

    const { data: blogs = [], isLoading, isError } = useQuery({
        queryKey: ['allBlogs'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/all-blogs`);
            return res.data;
        }
    });

    // Pagination Logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Page change hole upore niye jabe
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
                ))}
            </div>
        );
    }

    if (isError) return <div className="py-20 text-center text-red-500 font-bold">Failed to load blogs.</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <SectionHeading title="Our Scholarship Blogs" />
                </div>

                {/* Blogs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentBlogs.map((blog, index) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
                        >
                            <div className="relative overflow-hidden h-48">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-[#1e40af] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">{blog.category}</span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                                    <span>{blog.date}</span> • <span>By {blog.author}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">{blog.title}</h3>
                                <p className="text-sm text-gray-600 mb-6 line-clamp-3">{blog.excerpt}</p>
                                <div className="mt-auto">
                                    <Link to={`/blog-details/${blog._id}`}>
                                        <Link to={`/blog-details/${blog._id}`} className=" btn w-full py-3 rounded-xl border-2 border-[#1e40af] text-[#1e40af] font-bold text-sm hover:bg-[#1e40af] hover:text-white transition-all">
                                            View Details
                                        </Link>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-16 gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`px-4 py-2 rounded-lg font-bold ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white transition-all'}`}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === index + 1 ? 'bg-[#1e40af] text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-[#1e40af]'}`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`px-4 py-2 rounded-lg font-bold ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white transition-all'}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllBlogs;