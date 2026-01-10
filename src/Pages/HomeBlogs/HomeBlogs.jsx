import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import SectionHeading from '../../Component/Shared/SectionHeading';

const HomeBlogs = () => {
    // TanStack Query bebohar kore data fetch
    const { data: blogs = [], isLoading, isError } = useQuery({
        queryKey: ['homeBlogs'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/home-blogs`);
            return res.data;
        }
    });

    // Loading State: Skeleton ba Spinner (Requirement fulfill korbe)
    if (isLoading) {
        return (
            <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
                ))}
            </div>
        );
    }

    if (isError) return <p className="text-center text-red-500 py-10">Failed to load blogs.</p>;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeading title="Insightful Blogs" />
                <p className="opacity-80 text-center -mt-5 mb-12">
                    Latest news and tips to secure your scholarship.
                </p>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden"
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5 flex flex-col flex-grow">
                                <span className="text-xs font-bold text-[#1e40af] uppercase tracking-wider">
                                    {blog.category || "Scholarship Tips"}
                                </span>
                                <h3 className="text-lg font-bold mt-2 mb-3 text-gray-800 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                    {blog.excerpt}
                                </p>
                                <div className="mt-auto">
                                    <Link
                                        to={`/blog-details/${blog._id}`}
                                        className="text-[#1e40af] font-bold text-sm hover:underline"
                                    >
                                        READ MORE +
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-12">
                    <Link to="/all-blogs">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#1e40af] text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-blue-800 transition-all"
                        >
                            View More Blogs
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeBlogs;