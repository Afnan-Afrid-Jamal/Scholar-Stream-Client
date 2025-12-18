import React, { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineUsers } from 'react-icons/hi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { Link, Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineReviews } from 'react-icons/md';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext)

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ["userData", user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                params: { email: user?.email },
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4 text-3xl font-bold text-blue-600">
                        {userData?.role === 'Student' ? "Student " :
                            userData?.role === 'Moderator' ? "Moderator " :
                                userData?.role === 'Admin' ? "Admin " : ""}Dashboard
                    </div>


                </nav>
                {/* Page content here */}
                <div className="p-4"><Outlet></Outlet></div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="flex justify-evenly menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <IoHomeOutline size={30} />
                                <span className="is-drawer-close:hidden">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-profile" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                {/* Home icon */}
                                <CgProfile size={30} />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </Link>
                        </li>



                        {
                            userData?.role === 'Admin' &&
                            <>
                                <li>
                                    <Link to="/dashboard/add-scholarship" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Scholarship">
                                        {/* Home icon */}
                                        <IoMdAddCircleOutline size={30} />
                                        <span className="is-drawer-close:hidden">Add Scholarship</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/manage-scholarships" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Scholarships">
                                        {/* Home icon */}
                                        <HiOutlineAcademicCap size={30} />
                                        <span className="is-drawer-close:hidden">Manage Scholarships</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/manage-users" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
                                        {/* Home icon */}
                                        <HiOutlineUsers size={30} />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/analytics" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Analytics">
                                        {/* Home icon */}
                                        <HiOutlineChartBar size={30} />
                                        <span className="is-drawer-close:hidden">Analytics</span>
                                    </Link>
                                </li>
                            </>

                        }

                        {
                            userData?.role === 'Moderator' &&
                            <>

                                <li>
                                    <Link to="/dashboard/all-reviews" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Reviews">
                                        {/* Home icon */}
                                        <MdOutlineReviews size={30} />
                                        <span className="is-drawer-close:hidden">Reviews</span>
                                    </Link>
                                </li>

                            </>
                        }




                        {

                            userData?.role === 'Student' &&
                            <>

                                <li>
                                    <Link to="/dashboard/my-reviews" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Reviews">
                                        {/* Home icon */}
                                        <MdOutlineReviews size={30} />
                                        <span className="is-drawer-close:hidden">My Reviews</span>
                                    </Link>
                                </li>

                            </>
                        }


                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;