import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import { BsCalendar3 } from 'react-icons/bs';
import { FaUniversity } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';

const ScholarshipDetails = () => {
    const { id } = useParams();

    const { data: scholarship, isLoading, error } = useQuery({
        queryKey: ['scholarshipDetails', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/view-details/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <LoadingSpinner />;

    if (error)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 text-lg">Failed to load scholarship details.</p>
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Scholarship Header */}
            <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-full lg:w-1/3 h-64 lg:h-auto object-cover"
                />

                <div className="p-6 flex-1 flex flex-col justify-between">
                    {/* Scholarship Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{scholarship.scholarshipName}</h1>

                        <p className="flex items-center gap-2 text-gray-600 mb-2">
                            <FaUniversity className="text-blue-500" /> {scholarship.universityName} - {scholarship.universityCountry}
                        </p>
                        <p className="text-gray-600 mb-2">City: {scholarship.universityCity}</p>
                        <p className="text-gray-600 mb-2">Degree: {scholarship.degree}</p>
                        <p className="text-gray-600 mb-2">Category: {scholarship.scholarshipCategory}</p>
                    </div>

                    {/* Fees & Deadline */}
                    <div className="mt-4 border-t pt-4 flex flex-col gap-2">
                        <p className="flex items-center gap-2 text-gray-700">
                            <MdAttachMoney className="text-green-500" /> Tuition Fees: ${scholarship.tuitionFees}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <MdAttachMoney className="text-yellow-500" /> Application Fees: ${scholarship.applicationFees}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <BsCalendar3 className="text-red-500" /> Application Deadline: {scholarship.applicationDeadline}
                        </p>
                    </div>

                    {/* Apply Button */}
                    <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-medium">
                        Apply Now
                    </button>
                </div>
            </div>

            {/* Additional Details */}
            <div className="mt-8 bg-white shadow rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Additional Information</h2>
                <p className="text-gray-700 leading-relaxed">
                    {/* Example placeholder; later can include more detailed description if available */}
                    This scholarship is offered by {scholarship.universityName} for students pursuing {scholarship.degree} in {scholarship.subjectCategory}. Application deadline is {scholarship.applicationDeadline}. For more details, please contact: {scholarship.postedUserEmail}.
                </p>
            </div>
        </div>
    );
};

export default ScholarshipDetails;
