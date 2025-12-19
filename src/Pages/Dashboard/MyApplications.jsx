import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlineDollarCircle, AiOutlineStar } from 'react-icons/ai';

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const [showApplications, setShowApplications] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${import.meta.env.VITE_API_BASE_URL}/your-applications?email=${user.email}`)
                .then(res => setShowApplications(res.data))
                .catch(err => console.log(err));
        }
    }, [user]);

    return (
        <div className="w-full mx-auto p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">
                My Applications
            </h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="table-auto w-full min-w-max border-collapse">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="px-4 py-3 text-left">#</th>
                            <th className="px-4 py-3 text-left">University Name</th>
                            <th className="px-4 py-3 text-left">University Address</th>
                            <th className="px-4 py-3 text-left">Feedback</th>
                            <th className="px-4 py-3 text-left">Subject Category</th>
                            <th className="px-4 py-3 text-left">Application Fees</th>
                            <th className="px-4 py-3 text-left">Application Status</th>
                            <th className="px-4 py-3 text-left">Actions Buttons</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showApplications.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-500">
                                    No applications found.
                                </td>
                            </tr>
                        ) : (
                            showApplications.map((application, index) => (
                                <tr key={application._id} className="hover:bg-gray-50 transition-all">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{application.universityName}</td>
                                    <td className="px-4 py-3">{application.universityCity}, {application.universityCountry}</td>
                                    <td className="px-4 py-3">{application.feedback || "—"}</td>
                                    <td className="px-4 py-3">{application.scholarshipCategory}</td>
                                    <td className="px-4 py-3">${application.applicationFees}</td>
                                    <td className="px-4 py-3 text-sm font-semibold">{application.applicationStatus}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-2">

                                            {/* View Details Modal */}
                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                            <button className="btn btn-sm btn-outline btn-primary whitespace-nowrap" onClick={() => document.getElementById('my_modal_5').showModal()}>View</button>
                                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                <div className="modal-box w-full max-w-lg p-6">
                                                    <h2 className="text-2xl font-bold text-primary mb-4">{application.scholarshipName}</h2>

                                                    <div className="grid grid-cols-2 gap-3 mb-4 text-gray-700">
                                                        <div>
                                                            <p className="font-semibold">Applicant's Email</p>
                                                            <p>{application.userEmail}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">University Name</p>
                                                            <p>{application.universityName}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Address</p>
                                                            <p>{application.universityCity}, {application.universityCountry}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Category</p>
                                                            <p>{application.scholarshipCategory}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Degree</p>
                                                            <p>{application.degree}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Application Fees</p>
                                                            <p>${application.applicationFees}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Service Charge</p>
                                                            <p>${application.serviceCharge}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Total Paid</p>
                                                            <p>${application.totalPaid}</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Application Status</p>
                                                            <p className={application.applicationStatus === "pending" ? "text-yellow-600 font-semibold" : "text-green-600 font-semibold"}>
                                                                {application.applicationStatus}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Payment Status</p>
                                                            <p className={application.paymentStatus === "unpaid" ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
                                                                {application.paymentStatus}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">Application Date</p>
                                                            <p>{new Date(application.applicationDate).toLocaleString()}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <p className="font-semibold">Feedback</p>
                                                            <p>{application.feedback || "—"}</p>
                                                        </div>
                                                    </div>

                                                    <div className="modal-action mt-4">
                                                        <form method="dialog">
                                                            <button className="btn btn-primary w-full">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>



                                            <button className="btn btn-sm btn-outline btn-primary whitespace-nowrap"> Edit </button> <button className="btn btn-sm btn-outline btn-primary whitespace-nowrap"> Pay </button> <button className="btn btn-sm btn-outline btn-primary whitespace-nowrap"> Delete </button> <button className="btn btn-sm btn-outline btn-primary whitespace-nowrap"> Add Review </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplications;
