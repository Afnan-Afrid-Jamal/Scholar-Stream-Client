import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import SectionHeading from "../../Component/Shared/SectionHeading";
import LoadingSpinner from "../../Component/Shared/LoadingSpinner";
import { Link } from "react-router";

const TopSixScholarships = () => {
    const { data: topSixScholarships, isLoading, error } = useQuery({
        queryKey: ["topSixScholarships"],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/topSixScholarships`
            );
            return res.data;
        },
    });


    if (isLoading) return <LoadingSpinner></LoadingSpinner>;
    if (error) return <p>Error loading scholarships</p>;

    return (
        <div className="top-scholarships max-w-11/12 mx-auto px-4 py-8">
            <SectionHeading title="Top 6 Scholarships" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {topSixScholarships.map((scholarship) => (
                    <motion.div
                        key={scholarship._id}
                        className="border border-blue-400 rounded-lg shadow p-4 hover:shadow-lg transition-shadow flex flex-col h-full"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={scholarship.universityImage}
                            alt={scholarship.universityName}
                            className="w-full h-32 object-cover rounded-md mb-4 flex-shrink-0"
                        />
                        <h3 className="text-xl font-semibold mb-1">{scholarship.scholarshipName}</h3>
                        <p className="text-gray-600 mb-1">
                            {scholarship.universityName} - {scholarship.universityCountry}
                        </p>
                        <p className="text-gray-600 mb-1">Degree: {scholarship.degree}</p>
                        <p className="text-gray-600 mb-1">Category: {scholarship.scholarshipCategory}</p>
                        <p className="text-gray-600 mb-3">Application Fees: ${scholarship.applicationFees}</p>

                        <Link to={`/scholarship-details/${scholarship._id}`} className="mt-auto bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition">
                            View Details
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div >
    );
};

export default TopSixScholarships;
