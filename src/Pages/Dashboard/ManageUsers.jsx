import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const [role, setRole] = useState("all");
    const [showData, setShowData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial fetch all users
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/users`)
            .then(res => res.json())
            .then(data => {
                setShowData(data);
                setLoading(false);
            });
    }, []);

    // Filter users by role
    const handleFilter = (event) => {
        const selectRole = event.target.value;
        setRole(selectRole);
        setLoading(true);

        if (selectRole === "all") {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/users`)
                .then(res => res.json())
                .then(data => {
                    setShowData(data);
                    setLoading(false);
                });
        } else {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/users/role?role=${selectRole}`)
                .then(res => res.json())
                .then(data => {
                    setShowData(data);
                    setLoading(false);
                });
        }
    };

    // Delete user
    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(() => {
                        setShowData(prev => prev.filter(user => user._id !== id));
                        Swal.fire("Deleted!", "User has been removed.", "success");
                    });
            }
        });
    };

    return (
        <div className="p-6 bg-base-100 rounded-xl shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage Users</h2>

                {/* Filter dropdown */}
                <select onChange={handleFilter} className="select select-bordered select-sm">
                    <option value="all">All Roles</option>
                    <option value="Student">Student</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            {/* Table or Loading */}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra table-sm">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created At</th>
                                <th>Last Login</th>
                                <th className="text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showData.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className="badge badge-outline capitalize">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        {user.lastLogin
                                            ? new Date(user.lastLogin).toLocaleString()
                                            : <span className="text-gray-400">Never</span>}
                                    </td>
                                    <td className="text-center">
                                        <button onClick={() => handleDeleteUser(user._id)} className="btn btn-xs btn-error btn-outline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
