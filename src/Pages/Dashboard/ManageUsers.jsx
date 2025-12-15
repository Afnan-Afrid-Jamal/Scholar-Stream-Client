import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [role, setRole] = useState("all-roles");
    const [showData, setShowData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch users based on role
    const fetchUsers = async (selectedRole) => {
        setLoading(true);
        try {
            const url =
                selectedRole === "all-roles"
                    ? `${import.meta.env.VITE_API_BASE_URL}/users`
                    : `${import.meta.env.VITE_API_BASE_URL}/users/role?role=${selectedRole}`;

            const res = await fetch(url);
            const data = await res.json();
            setShowData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete user
    const handleDeleteUser = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        const result = await swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`, {
                    method: "DELETE",
                });

                // Refresh user list
                fetchUsers(role);

                await swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                console.error("Delete failed:", error);
                await swalWithBootstrapButtons.fire({
                    title: "Error!",
                    text: "Delete failed.",
                    icon: "error"
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            await swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your user is safe :)",
                icon: "error"
            });
        }
    };









    // Load all users initially
    useEffect(() => {
        fetchUsers("all-roles");
    }, []);

    // Handle dropdown change
    const handleFilter = (event) => {
        const value = event.target.value;
        setRole(value);
        fetchUsers(value);
    };

    return (
        <div className="p-6 bg-base-100 rounded-xl shadow-md">
            {/* Header */}
            <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center gap-6 mb-6">
                <h2 className="text-2xl font-semibold">Manage Users</h2>

                {/* Filter dropdown */}
                <select
                    value={role}
                    onChange={handleFilter}
                    className="select select-bordered select-sm"
                >
                    <option value="all-roles">All Roles</option>
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
                                <th className="text-center">Change Role</th>
                                <th className="text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showData.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td className="font-medium">{user.name}</td>
                                    <td className="text-gray-500">{user.email}</td>
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

                                    {/* Change Role */}
                                    <td className="text-center">
                                        <div className="dropdown dropdown-left">
                                            <label tabIndex={0} className="btn btn-xs btn-outline">
                                                Change
                                            </label>
                                            <ul
                                                tabIndex={0}
                                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                                            >
                                                <li><a>Student</a></li>
                                                <li><a>Moderator</a></li>
                                                <li><a>Admin</a></li>
                                            </ul>
                                        </div>
                                    </td>

                                    {/* Delete */}
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
