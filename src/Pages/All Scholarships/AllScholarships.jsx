import React, { useState } from 'react';
import SectionHeading from '../../Component/Shared/SectionHeading';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BsDatabaseExclamation } from 'react-icons/bs';

const AllScholarships = () => {
    const [displayScholarships, setDisplayScholarships] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Load All Scholarships
    const { data: allScholarships, isLoading, error } = useQuery({
        queryKey: ["allScholarships"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/allScholarships`);
            setDisplayScholarships(res.data);
            return res.data;
        },
    });

    // Search Handler
    const handleSearch = async (event) => {
        event.preventDefault();
        const searchText = event.target.searchScholarship.value.trim();
        setSearchText(searchText);
        if (!searchText) {
            setDisplayScholarships(allScholarships);
            setCurrentPage(1);
            return;
        }

        const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/findScholarshipsBySearch?search=${searchText}`
        );
        setDisplayScholarships(res.data);
        setCurrentPage(1);
    };

    // Category Filter
    const handleCategoryChange = async (event) => {
        const category = event.target.value;
        if (category === "") {
            setDisplayScholarships(allScholarships);
            setCurrentPage(1);
            return;
        }
        const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/findScholarshipsByFiltering?filter=${category}`
        );
        setDisplayScholarships(res.data);
        setCurrentPage(1);
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-center py-10">Error loading scholarships</p>;

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = displayScholarships.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(displayScholarships.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <SectionHeading title="All Scholarships" />

            {/* Search + Category */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">
                <form className="flex max-w-md w-full" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search Scholarships"
                        name="searchScholarship"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 hover:cursor-pointer"
                    >
                        Search
                    </button>
                    {searchText.length !== 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchText("");
                                setDisplayScholarships(allScholarships);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-3 bg-gray-500 text-white hover:bg-gray-600 hover:cursor-pointer rounded-r-lg"
                        >
                            Clear
                        </button>
                    )}
                </form>

                <select
                    onChange={handleCategoryChange}
                    className="px-4 py-3 rounded-lg border border-gray-300 bg-white w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="Full fund">Full Fund</option>
                    <option value="Partial fund">Partial Fund</option>
                    <option value="Self fund">Self Fund</option>
                </select>
            </div>

            {/* Cards or No Data */}
            {displayScholarships.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="bg-gray-100 rounded-xl p-10 flex flex-col items-center shadow-md">
                        <BsDatabaseExclamation size={60} className="text-gray-400 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            No Scholarships Found
                        </h2>
                        <p className="text-gray-500 text-center">
                            We couldn't find any scholarships matching your search. Try adjusting your search or filter.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentItems.map((scholarship) => (
                            <div
                                key={scholarship._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 flex flex-col"
                            >
                                <img
                                    src={scholarship.universityImage}
                                    alt={scholarship.universityName}
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4 flex-shrink-0"
                                />
                                <h3 className="text-xl font-semibold mb-1">{scholarship.scholarshipName}</h3>
                                <p className="text-gray-600">{scholarship.universityName}</p>
                                <p className="text-gray-600">Category: {scholarship.scholarshipCategory}</p>
                                <p className="text-gray-600">Degree: {scholarship.degree}</p>
                                <p className="text-gray-600 mb-4">Application Fees: ${scholarship.applicationFees}</p>
                                <button className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: totalPages }, (_, idx) => (
                            <button
                                key={idx + 1}
                                onClick={() => handlePageChange(idx + 1)}
                                className={`px-4 hover:cursor-pointer py-2 rounded ${currentPage === idx + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AllScholarships;
