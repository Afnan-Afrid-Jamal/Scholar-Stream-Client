import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaRegSave, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

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

    // handle edit review

    const handleEditReview = async (event, id) => {
        event.preventDefault();

        const newRatingPoint = Number(event.target.ratingValue.value);
        const newReviewComment = event.target.reviewComment.value;

        const newReviewData = {
            ratingPoint: newRatingPoint,
            reviewComment: newReviewComment,
        };

        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/update-review/${id}`,
            { data: newReviewData }
        );

        if (res.data.modifiedCount > 0) {
            setShowReview(prev =>
                prev.map(review =>
                    review._id === id
                        ? {
                            ...review,
                            ratingPoint: newRatingPoint,
                            reviewComment: newReviewComment,
                        }
                        : review
                )
            );

            document.getElementById(`edit_modal_${id}`).close();
        }
    };


    // handle delete review

    const handleDeleteReview = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {  // <-- async যুক্ত
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(
                        `${import.meta.env.VITE_API_BASE_URL}/delete-review/${id}`
                    );

                    if (res.data.deletedCount > 0) {
                        setShowReview(prev =>
                            prev.filter(review => review._id !== id)
                        );

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your review has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete review.",
                        icon: "error"
                    });
                }
            }
        });
    };



    if (loading) {
        return <p className="p-10 text-center text-gray-600">Loading your reviews...</p>;
    }

    if (showReview.length === 0) {
        return <p className="p-10 text-center text-gray-600">No reviews found.</p>;
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Reviews</h1>

            <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Scholarship</th>
                            <th className="px-6 py-4">University</th>
                            <th className="px-6 py-4">Review</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-center">Rating</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showReview.map((review) => (
                            <tr
                                key={review._id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {review.scholarshipName}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {review.universityName}
                                </td>

                                <td className="px-6 py-4 text-gray-600 max-w-xs break-words">
                                    {review.reviewComment}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {review.reviewDate}
                                </td>

                                <td className="px-6 py-4 text-center font-semibold">
                                    {review.ratingPoint}/5
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-4">
                                        <button
                                            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition hover:cursor-pointer"
                                            onClick={() =>
                                                document
                                                    .getElementById(`edit_modal_${review._id}`)
                                                    .showModal()
                                            }
                                        >
                                            <FaEdit size={16} />
                                        </button>

                                        <dialog
                                            id={`edit_modal_${review._id}`}
                                            className="modal modal-bottom sm:modal-middle"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg mb-4">
                                                    Edit Your Review
                                                </h3>

                                                <form
                                                    onSubmit={(event) =>
                                                        handleEditReview(event, review._id)
                                                    }
                                                    className="space-y-4"
                                                >
                                                    <div className="rating rating-md">
                                                        <input type="radio" value="1" name="ratingValue" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" value="2" name="ratingValue" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" value="3" name="ratingValue" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" value="4" name="ratingValue" className="mask mask-star-2 bg-orange-400" />
                                                        <input type="radio" value="5" name="ratingValue" className="mask mask-star-2 bg-orange-400" />
                                                    </div>

                                                    <textarea
                                                        name="reviewComment"
                                                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-200"
                                                        rows="7"
                                                        placeholder="Update your review..."
                                                        defaultValue={review.reviewComment}
                                                    ></textarea>

                                                    <div className="flex justify-evenly">
                                                        <button type="submit" className="btn btn-primary flex gap-2">
                                                            <FaRegSave /> Save
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-error"
                                                            onClick={() =>
                                                                document
                                                                    .getElementById(`edit_modal_${review._id}`)
                                                                    .close()
                                                            }
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </dialog>

                                        <button onClick={() => handleDeleteReview(review._id)} className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition hover:cursor-pointer">
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
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
