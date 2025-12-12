import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import { BsCalendar3 } from 'react-icons/bs';
import { FaUniversity, FaStar } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

const ScholarshipDetails = () => {
    const { id } = useParams();

    // Scholarship details fetch
    const { data: scholarship, isLoading: loadingScholarship, error: scholarshipError } = useQuery({
        queryKey: ['scholarshipDetails', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/view-details/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    // All review fetch
    const { data: allReviews, isLoading: loadingReviews, error: reviewsError } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviewDetails`);
            return res.data;
        },
    });

    if (loadingScholarship || loadingReviews) return <LoadingSpinner />;

    if (scholarshipError || reviewsError)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 text-lg">Failed to load scholarship details or reviews.</p>
            </div>
        );

    // Filter reviews for this university
    const filteredReviews = allReviews.filter(
        (review) => review.universityName === scholarship.universityName
    );

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10">
            {/* Scholarship Header */}
            <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-full lg:w-1/3 h-64 lg:h-auto object-cover"
                />

                <div className="p-6 flex-1 flex flex-col justify-between">
                    {/* Scholarship Info */}
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900">{scholarship.scholarshipName}</h1>
                        <p className="flex items-center gap-2 text-gray-700">
                            <FaUniversity className="text-blue-500" /> {scholarship.universityName} - {scholarship.universityCountry}
                        </p>
                        <p className="text-gray-600">City: {scholarship.universityCity}</p>
                        <p className="text-gray-600">Degree: {scholarship.degree}</p>
                        <p className="text-gray-600">Category: {scholarship.scholarshipCategory}</p>
                    </div>

                    {/* Fees & Deadline */}
                    <div className="mt-6 border-t pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <p className="flex items-center gap-2 text-gray-700">
                            <MdAttachMoney className="text-green-500" /> Tuition Fees: ${scholarship.tuitionFees}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <MdAttachMoney className="text-yellow-500" /> Application Fees: ${scholarship.applicationFees}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <BsCalendar3 className="text-red-500" /> Deadline: {scholarship.applicationDeadline}
                        </p>
                    </div>

                    {/* Apply Button */}
                    <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all text-lg font-semibold">
                        Apply Now
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Student Reviews</h2>

                {filteredReviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-6">No reviews found for this university yet.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredReviews.map((review) => (
                            <div
                                key={review._id}
                                className="flex flex-col rounded-2xl p-5 bg-gray-50 shadow-sm hover:shadow-md transition-all  border border-blue-400"
                            >
                                <div className="flex items-center mb-3 gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
                                        {review.userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">{review.userName}</p>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            {[...Array(review.ratingPoint)].map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm">{new Date(review.reviewDate).toLocaleDateString()}</p>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{review.reviewComment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default ScholarshipDetails;
