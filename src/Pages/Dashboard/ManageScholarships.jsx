import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { uploadImage } from '../../Utils';
import Swal from 'sweetalert2';

const ManageScholarships = () => {
    const axiosSecure = useAxiosSecure();
    const [showData, setShowData] = useState([]);


    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/allScholarships`)
            .then(res => setShowData(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleUpdate = async (event, id, currentImageUrl) => {
        event.preventDefault();
        const form = event.target;

        const fileInput = form.imageFile.files[0];

        let finalImageUrl = form.universityImage.value || currentImageUrl;

        if (fileInput) {
            toast.info("Uploading new image...");


            const newPhotoURL = await uploadImage(fileInput);

            if (newPhotoURL) {
                finalImageUrl = newPhotoURL;
            } else {
                toast.error("New image upload failed. Using existing URL.");

            }
        }


        const updatedData = {
            scholarshipName: form.scholarshipName.value,
            universityName: form.universityName.value,

            universityImage: finalImageUrl,
            universityCountry: form.universityCountry.value,
            universityCity: form.universityCity.value,
            universityWorldRank: Number(form.universityWorldRank.value),
            subjectCategory: form.subjectCategory.value,
            scholarshipCategory: form.scholarshipCategory.value,
            degree: form.degree.value,
            tuitionFees: Number(form.tuitionFees.value),
            applicationFees: Number(form.applicationFees.value),
            serviceCharge: Number(form.serviceCharge.value),
            applicationDeadline: form.applicationDeadline.value,
            scholarshipPostDate: form.scholarshipPostDate.value,
            postedUserEmail: form.postedUserEmail.value,
        };


        try {
            const res = await axiosSecure.put(`${import.meta.env.VITE_API_BASE_URL}/updateScholarship/${id}`, updatedData)

            if (res.data.modifiedCount > 0) {
                toast.success("Scholarship updated successfully!")
            } else {
                toast.warn("No changes detected or update failed.");
            }

            window.location.reload();

        } catch (err) {
            console.error(err);
            toast.error("Failed to update scholarship. Please try again!");
        }
    };

    // Delete scholarship

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`${import.meta.env.VITE_API_BASE_URL}/delete-scholarship/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            toast.success("Scholarship deleted successfully!");
                            setShowData(prevData => prevData.filter(scholarship => scholarship._id !== id));

                        } else {
                            toast.error("Failed to delete scholarship or item not found.");
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        toast.error("An error occurred during deletion!");
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="p-6 bg-base-100 rounded-xl shadow-md overflow-x-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🏆 Manage Scholarships</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra table-sm w-full min-w-[900px]">
                    <thead className="bg-blue-100 text-blue-800">
                        <tr>
                            <th>#</th>
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Degree</th>
                            <th>Deadline</th>
                            <th>Posted By</th>
                            <th className="text-center">Update</th>
                            <th className="text-center">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {showData.map((scholarship, index) => (
                            <tr key={scholarship._id || index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                <th>{index + 1}</th>
                                <td>{scholarship.scholarshipName}</td>
                                <td>{scholarship.universityName}</td>
                                <td>{scholarship.subjectCategory}</td>
                                <td>{scholarship.scholarshipCategory}</td>
                                <td>{scholarship.degree}</td>
                                <td>{new Date(scholarship.applicationDeadline).toLocaleDateString()}</td>
                                <td>{scholarship.postedUserEmail}</td>

                                <td className="text-center">
                                    <button
                                        className="btn btn-xs btn-outline btn-primary hover:bg-info hover:text-white transition duration-150"
                                        onClick={() =>
                                            document.getElementById(`modal_${index}`).showModal()
                                        }
                                    >
                                        Update
                                    </button>

                                    {/* মডেলের ডিজাইন */}
                                    <dialog id={`modal_${index}`} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box max-w-4xl p-8 bg-white rounded-lg shadow-2xl">

                                            {/* হেডার */}
                                            <h3 className="text-2xl font-extrabold text-indigo-600 border-b-2 pb-2 mb-6 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25H6a2.25 2.25 0 00-2.25 2.25v2.25a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25z" />
                                                </svg>
                                                Update Scholarship Details
                                            </h3>

                                            {/* 💡 ফর্ম সাবমিট handler-এ বর্তমান ইমেজ URL পাঠানো হলো */}
                                            <form onSubmit={(event) => handleUpdate(event, scholarship._id, scholarship.universityImage)} className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                                {/* Scholarship Name */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Scholarship Name</label>
                                                    <input type="text" name="scholarshipName" defaultValue={scholarship.scholarshipName} className="input input-bordered input-primary w-full transition duration-150" required />
                                                </div>

                                                {/* University Name */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">University Name</label>
                                                    <input type="text" name="universityName" defaultValue={scholarship.universityName} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* University Image (URL) */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">University Image (URL)</label>
                                                    <input type="text" name="universityImage" defaultValue={scholarship.universityImage} className="input input-bordered input-primary w-full" />
                                                </div>

                                                {/* Upload New Image File */}
                                                <div className='md:col-span-1'>
                                                    <label className="label text-sm font-medium text-gray-700">Upload New Image File</label>
                                                    <input type="file" name="imageFile" accept="image/*" className="file-input file-input-bordered file-input-info w-full" />
                                                </div>


                                                {/* Country */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Country</label>
                                                    <input type="text" name="universityCountry" defaultValue={scholarship.universityCountry} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* City */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">City</label>
                                                    <input type="text" name="universityCity" defaultValue={scholarship.universityCity} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* World Rank */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">World Rank</label>
                                                    <input type="number" name="universityWorldRank" defaultValue={scholarship.universityWorldRank} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Subject Category */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Subject Category</label>
                                                    <input type="text" name="subjectCategory" defaultValue={scholarship.subjectCategory} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Scholarship Category */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Scholarship Category</label>
                                                    <input type="text" name="scholarshipCategory" defaultValue={scholarship.scholarshipCategory} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Degree */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Degree</label>
                                                    <input type="text" name="degree" defaultValue={scholarship.degree} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Tuition Fees */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Tuition Fees</label>
                                                    <input type="number" name="tuitionFees" defaultValue={scholarship.tuitionFees} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Application Fees */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Application Fees</label>
                                                    <input type="number" name="applicationFees" defaultValue={scholarship.applicationFees} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Service Charge */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Service Charge</label>
                                                    <input type="number" name="serviceCharge" defaultValue={scholarship.serviceCharge} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Application Deadline */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Application Deadline</label>
                                                    <input type="date" name="applicationDeadline" defaultValue={scholarship.applicationDeadline} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Scholarship Post Date */}
                                                <div>
                                                    <label className="label text-sm font-medium text-gray-700">Scholarship Post Date</label>
                                                    <input type="date" name="scholarshipPostDate" defaultValue={scholarship.scholarshipPostDate} className="input input-bordered input-primary w-full" required />
                                                </div>

                                                {/* Posted User Email (Read-only) */}
                                                <div className="md:col-span-3">
                                                    <label className="label text-sm font-medium text-gray-700">Posted User Email</label>
                                                    <input type="email" name="postedUserEmail" defaultValue={scholarship.postedUserEmail} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                                                </div>

                                                {/* Save বাটন */}
                                                <div className="md:col-span-3 pt-4">
                                                    <button type="submit" className='btn btn-lg btn-success w-full text-white font-bold transition duration-300' >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Save Changes
                                                    </button>
                                                </div>

                                            </form>

                                            <div className="modal-action mt-6">
                                                <form method="dialog">
                                                    {/* Close বাটন */}
                                                    <button className="btn btn-sm btn-error text-white">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>

                                <td className="text-center">
                                    <button onClick={() => handleDelete(scholarship._id)} className="btn btn-xs btn-outline btn-error hover:bg-error hover:text-white transition duration-150">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScholarships;