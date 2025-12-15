import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AddScholarship = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const scholarshipData = {
            scholarshipName: form.scholarshipName.value.trim(),
            universityName: form.universityName.value.trim(),
            universityImage: form.universityImage.value.trim(),
            universityCountry: form.universityCountry.value.trim(),
            universityCity: form.universityCity.value.trim(),
            universityWorldRank: parseInt(form.universityWorldRank.value),
            subjectCategory: form.subjectCategory.value,
            scholarshipCategory: form.scholarshipCategory.value,
            degree: form.degree.value,
            tuitionFees: form.tuitionFees.value ? parseFloat(form.tuitionFees.value) : 0,
            applicationFees: parseFloat(form.applicationFees.value),
            serviceCharge: parseFloat(form.serviceCharge.value),
            applicationDeadline: form.applicationDeadline.value,
            scholarshipPostDate: new Date().toISOString(),
            postedUserEmail: user?.email,
        };

        try {
            const res = await axiosSecure.post("/add-scholarship", scholarshipData);
            console.log("Scholarship added:", res.data);
            toast.success("Scholarship published successfully!")
            form.reset(); // Clear the form
        } catch (err) {
            console.error(err);
            toast.error("Failed to add scholarship. Please try again!");
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    Add New Scholarship
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Scholarship Name */}
                    <div>
                        <label className="label font-medium">Scholarship Name</label>
                        <input type="text" name="scholarshipName" className="input input-bordered w-full" required />
                    </div>

                    {/* University Name */}
                    <div>
                        <label className="label font-medium">University Name</label>
                        <input type="text" name="universityName" className="input input-bordered w-full" required />
                    </div>

                    {/* University Image */}
                    <div className="flex flex-col">
                        <label className="label font-medium">University Image (URL)</label>
                        <input type="file" className="file-input w-full file-input-md" />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="label font-medium">Country</label>
                        <input type="text" name="universityCountry" className="input input-bordered w-full" required />
                    </div>

                    {/* City */}
                    <div>
                        <label className="label font-medium">City</label>
                        <input type="text" name="universityCity" className="input input-bordered w-full" required />
                    </div>

                    {/* World Rank */}
                    <div>
                        <label className="label font-medium">World Rank</label>
                        <input type="number" name="universityWorldRank" className="input input-bordered w-full" min={1} required />
                    </div>

                    {/* Subject Category */}
                    <div>
                        <label className="label font-medium">Subject Category</label>
                        <select name="subjectCategory" className="select select-bordered w-full" required>
                            <option value="">Select</option>
                            <option>Computer Science</option>
                            <option>Engineering</option>
                            <option>Business</option>
                            <option>Medical</option>
                            <option>Arts</option>
                        </select>
                    </div>

                    {/* Scholarship Category */}
                    <div>
                        <label className="label font-medium">Scholarship Category</label>
                        <select name="scholarshipCategory" className="select select-bordered w-full" required>
                            <option value="">Select</option>
                            <option>Full fund</option>
                            <option>Partial</option>
                            <option>Self fund</option>
                        </select>
                    </div>

                    {/* Degree */}
                    <div>
                        <label className="label font-medium">Degree</label>
                        <select name="degree" className="select select-bordered w-full" required>
                            <option value="">Select</option>
                            <option>Diploma</option>
                            <option>Bachelor</option>
                            <option>Masters</option>
                            <option>PhD</option>
                        </select>
                    </div>

                    {/* Tuition Fees */}
                    <div>
                        <label className="label font-medium">Tuition Fees <span className="text-gray-400">(Optional)</span></label>
                        <input type="number" name="tuitionFees" className="input input-bordered w-full" min={0} />
                    </div>

                    {/* Application Fees */}
                    <div>
                        <label className="label font-medium">Application Fees</label>
                        <input type="number" name="applicationFees" className="input input-bordered w-full" min={0} required />
                    </div>

                    {/* Service Charge */}
                    <div>
                        <label className="label font-medium">Service Charge</label>
                        <input type="number" name="serviceCharge" className="input input-bordered w-full" min={0} required />
                    </div>

                    {/* Application Deadline */}
                    <div>
                        <label className="label font-medium">Application Deadline</label>
                        <input type="date" name="applicationDeadline" className="input input-bordered w-full" required />
                    </div>

                    {/* Posted User Email */}
                    <div>
                        <label className="label font-medium">Posted By</label>
                        <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-6">
                        <button type="submit" className="btn btn-primary w-full text-lg">
                            Publish Scholarship
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;
