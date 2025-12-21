import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageApplications = () => {
    const [showApplications, setShowApplications] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/all-applications`)
            .then(res => {
                setShowApplications(res.data);
            });
    }, []);

    // Feedback handler
    const handleFeedback = (event, id) => {
        event.preventDefault();
        const updatedText = event.target.feedbackText.value;

        axios.patch(`${import.meta.env.VITE_API_BASE_URL}/update-feedback/${id}`, { updatedText })
            .then(res => {
                console.log("Feedback updated", res.data);
                document.getElementById(`feedback-${id}`).close();
                setShowApplications(prev =>
                    prev.map(app =>
                        app._id === id ? { ...app, feedback: updatedText } : app
                    )
                );
            })
            .catch(err => console.error(err));
    };

    // Cancel handler
    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once cancelled, you won't be able to undo this application!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it",
            cancelButtonText: "No, keep it"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${import.meta.env.VITE_API_BASE_URL}/cancel-application/${id}`)
                    .then(res => {
                        // Update local state
                        setShowApplications(prev =>
                            prev.map(app =>
                                app._id === id ? { ...app, applicationStatus: "cancel" } : app
                            )
                        );

                        Swal.fire({
                            title: "Application Cancelled!",
                            text: "The selected application has been successfully cancelled.",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "OK"
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire({
                            title: "Oops!",
                            text: "Something went wrong. Please try again.",
                            icon: "error",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "OK"
                        });
                    });
            }
        });
    };




    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">
                Manage Applied Applications
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr className="text-sm font-semibold text-gray-700">
                            <th className="px-4 py-3 border">Applicant Name</th>
                            <th className="px-4 py-3 border">Applicant Email</th>
                            <th className="px-4 py-3 border">University</th>
                            <th className="px-4 py-3 border">Feedback</th>
                            <th className="px-4 py-3 border">Status</th>
                            <th className="px-4 py-3 border">Payment</th>
                            <th className="px-4 py-3 border text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showApplications.map(application => (
                            <tr key={application._id} className="text-sm hover:bg-gray-50">
                                <td className="px-4 py-3 border">{application.userName || "N/A"}</td>
                                <td className="px-4 py-3 border">{application.userEmail}</td>
                                <td className="px-4 py-3 border">{application.universityName}</td>
                                <td className="px-4 py-3 border">{application.feedback || "No feedback"}</td>
                                <td className="px-4 py-3 border">
                                    <span className="badge badge-warning badge-sm">{application.applicationStatus}</span>
                                </td>
                                <td className="px-4 py-3 border">
                                    <span className={`badge badge-sm ${application.paymentStatus === "paid" ? "badge-success" : "badge-error"}`}>
                                        {application.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3 border text-center">
                                    <div className="flex justify-center gap-2">

                                        {/* DETAILS BUTTON */}
                                        <button
                                            className="btn btn-xs btn-outline"
                                            onClick={() => document.getElementById(`details-${application._id}`).showModal()}
                                        >
                                            Details
                                        </button>

                                        {/* DETAILS MODAL */}
                                        <dialog
                                            id={`details-${application._id}`}
                                            className="modal modal-bottom sm:modal-middle"
                                        >
                                            <div className="modal-box max-w-3xl p-6">
                                                <h3 className="font-bold text-xl mb-4 border-b pb-2">Application Details</h3>

                                                <div className="grid grid-cols-2 gap-4 text-sm">

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Application ID:</p>
                                                        <p className="text-gray-800">{application._id}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Scholarship ID:</p>
                                                        <p className="text-gray-800">{application.scholarshipId}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Scholarship Name:</p>
                                                        <p className="text-gray-800">{application.scholarshipName}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Applicant Name:</p>
                                                        <p className="text-gray-800">{application.userName}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Email:</p>
                                                        <p className="text-gray-800">{application.userEmail}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">University:</p>
                                                        <p className="text-gray-800">{application.universityName}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">University City:</p>
                                                        <p className="text-gray-800">{application.universityCity}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">University Country:</p>
                                                        <p className="text-gray-800">{application.universityCountry}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Degree:</p>
                                                        <p className="text-gray-800">{application.degree}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Subject Category:</p>
                                                        <p className="text-gray-800">{application.subjectCategory}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Scholarship Category:</p>
                                                        <p className="text-gray-800">{application.scholarshipCategory}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Application Fees:</p>
                                                        <p className="text-gray-800">${application.applicationFees}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Service Charge:</p>
                                                        <p className="text-gray-800">${application.serviceCharge}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Total Paid:</p>
                                                        <p className="text-gray-800">${application.totalPaid}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Application Status:</p>
                                                        <p className="text-gray-800">{application.applicationStatus}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Payment Status:</p>
                                                        <p className="text-gray-800">{application.paymentStatus}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Application Date:</p>
                                                        <p className="text-gray-800">{new Date(application.applicationDate).toLocaleString()}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-500 font-medium">Feedback:</p>
                                                        <p className="text-gray-800">{application.feedback || "No feedback yet"}</p>
                                                    </div>


                                                </div>

                                                <div className="modal-action mt-4">
                                                    <form method="dialog">
                                                        <button className="btn btn-sm btn-primary">Close</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>

                                        {/* FEEDBACK BUTTON */}
                                        <button
                                            className="btn btn-xs btn-outline btn-info"
                                            onClick={() => document.getElementById(`feedback-${application._id}`).showModal()}
                                        >
                                            Feedback
                                        </button>

                                        {/* FEEDBACK MODAL */}
                                        <dialog
                                            id={`feedback-${application._id}`}
                                            className="modal modal-bottom sm:modal-middle"
                                        >
                                            <div className="modal-box max-w-lg p-6">
                                                <h3 className="font-bold text-xl mb-4 border-b pb-2">
                                                    Give Feedback
                                                </h3>

                                                <form onSubmit={(event) => handleFeedback(event, application._id)} className="space-y-4">
                                                    <textarea
                                                        name='feedbackText'
                                                        className="textarea textarea-bordered w-full h-32 resize-none"
                                                        placeholder="Write your feedback here..."
                                                    />
                                                    <div className="flex justify-end gap-2">
                                                        <button type="submit" className="btn btn-primary btn-sm">Save</button>
                                                        <button type="button" className="btn btn-outline btn-sm" onClick={() => document.getElementById(`feedback-${application._id}`).close()}>Close</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </dialog>

                                        <button className="btn btn-xs btn-outline btn-success">Update</button>
                                        <button
                                            onClick={() => handleCancel(application._id)}
                                            className="btn btn-xs btn-outline btn-error"
                                            disabled={application.applicationStatus === "cancel"}
                                        >
                                            Cancel
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

export default ManageApplications;
