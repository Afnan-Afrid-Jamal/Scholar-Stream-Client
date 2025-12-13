import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {

    const { user } = useContext(AuthContext)

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ["userData", user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                params: { email: user?.email }, // <-- query params
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    return (
        <div className="min-h-[calc(100vh-64px)] p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    My Profile
                </h2>

                {/* Profile Body */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Profile Photo */}
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-sm">
                        <img
                            src={userData?.photoURL}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-6">
                        {/* Name */}
                        <div className="flex items-center gap-4">
                            <FaUser className="text-blue-500 text-2xl" />
                            <div>
                                <p className="text-gray-500 text-sm">Full Name</p>
                                <p className="text-gray-800 text-lg font-semibold">
                                    {userData?.name || "No Name"}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-blue-500 text-2xl" />
                            <div>
                                <p className="text-gray-500 text-sm">Email Address</p>
                                <p className="text-gray-800 text-lg font-semibold">
                                    {userData?.email || "No Email"}
                                </p>
                            </div>
                        </div>

                        {/* Role */}
                        <div className="flex items-center gap-4">
                            <FaCalendarAlt className="text-blue-500 text-2xl" />
                            <div>
                                <p className="text-gray-500 text-sm">Role</p>
                                <span className="text-white bg-blue-500 px-3 py-1 rounded-full text-sm font-medium">
                                    {userData?.role}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optional Footer / Info */}
                <div className="mt-10 text-gray-500 text-sm space-y-1">
                    <p>Account created at: {userData?.createdAt || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
