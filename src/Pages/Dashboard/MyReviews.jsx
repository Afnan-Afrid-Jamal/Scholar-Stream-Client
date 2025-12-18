import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [showReview, setShowReview] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${import.meta.env.VITE_API_BASE_URL}/ReviewByAUser?email=${user.email}`)
                .then((res) => setShowReview(res.data))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [user?.email]);

    if (loading) {
        return <p className="p-8 text-gray-700">Loading your reviews...</p>;
    }

    if (showReview.length === 0) {
        return <p className="p-8 text-gray-700">No reviews found.</p>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Reviews</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-200">
                    <thead className="bg-blue-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                                Scholarship ID
                            </th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                                University Name
                            </th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                                Review Comment
                            </th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                                Review Date
                            </th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                                Rating
                            </th>
                            <th className="text-center px-6 py-3 text-sm font-medium text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showReview.map((review) => (
                            <tr key={review.scholarshipId} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-700">{review.scholarshipName}</td>
                                <td className="px-6 py-4 text-gray-700">{review.universityName}</td>
                                <td className="px-6 py-4 text-gray-700">{review.reviewComment}</td>
                                <td className="px-6 py-4 text-gray-700">{review.reviewDate}</td>
                                <td className="px-6 py-4 text-gray-700">{review.ratingPoint}/5</td>
                                <td className="px-6 py-4 flex justify-center gap-3">
                                    <button className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                                    <button className="text-red-600 hover:text-red-800"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;
