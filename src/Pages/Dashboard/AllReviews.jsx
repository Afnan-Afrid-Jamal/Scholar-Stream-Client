import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SectionHeading from '../../Component/Shared/SectionHeading';
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from 'sweetalert2';

const AllReviews = () => {

    const [showReviews, setShowReviews] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviewDetails`)
            .then(res => setShowReviews(res.data))
            .catch(err => console.error(err));
    }, []);


    // Handle Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => { 
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/deleteReview/${id}`);
                    const updatedData = showReviews.filter(prev => prev._id !== id);
                    setShowReviews(updatedData);

                    Swal.fire({
                        title: "Deleted!",
                        text: "The review has been deleted.",
                        icon: "success"
                    });

                } catch (error) {
                    console.error("Delete failed:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete review.",
                        icon: "error"
                    });
                }
            }
        });
    };



    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Page Title */}
                <SectionHeading title="All Reviews"></SectionHeading>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        showReviews.map(review => (
                            <div
                                key={review._id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col"
                            >

                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review.userImage}
                                            alt={review.userName}
                                            className="w-12 h-12 rounded-full object-cover border"
                                        />

                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                {review.userName}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {review.userEmail}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Delete */}
                                    <button
                                        onClick={() => {
                                            handleDelete(review._id)
                                        }}
                                        className="text-red-500 btn hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                                        title="Delete Review"
                                    >
                                        <RiDeleteBin5Fill size={25} />
                                    </button>
                                </div>

                                {/* University */}
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium">University:</span> {review.universityName}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                                    {
                                        [...Array(5)].map((_, i) => (
                                            <span key={i}>
                                                {i < review.ratingPoint ? "★" : "☆"}
                                            </span>
                                        ))
                                    }
                                    <span className="text-sm text-gray-600 ml-2">
                                        ({review.ratingPoint}/5)
                                    </span>
                                </div>

                                {/* Review Comment */}
                                <p className="text-gray-700 text-sm italic flex-grow">
                                    “{review.reviewComment}”
                                </p>

                                {/* Footer */}
                                <div className="mt-4 text-xs text-gray-400">
                                    <span>{review.reviewDate}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default AllReviews;
