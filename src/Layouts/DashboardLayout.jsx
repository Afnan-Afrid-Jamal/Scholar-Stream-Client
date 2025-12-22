import React, { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineUsers } from 'react-icons/hi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineDescription, MdOutlineManageAccounts, MdOutlineReviews } from 'react-icons/md';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);

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


    const activeLink = "bg-blue-600 text-white !important";

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4 text-3xl font-bold text-blue-600">
                        {userData?.role === 'Student' ? "Student " :
                            userData?.role === 'Moderator' ? "Moderator " :
                                userData?.role === 'Admin' ? "Admin " : ""}Dashboard
                    </div>
                </nav>
                <div className="p-4"><Outlet></Outlet></div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    <ul className="flex justify-evenly menu w-full grow">
                        <li>
                            <NavLink to="/" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Homepage">
                                <IoHomeOutline size={30} />
                                <span className="is-drawer-close:hidden">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-profile" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="My Profile">
                                <CgProfile size={30} />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </NavLink>
                        </li>

                        {userData?.role === 'Admin' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-scholarship" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Add Scholarship">
                                        <IoMdAddCircleOutline size={30} />
                                        <span className="is-drawer-close:hidden">Add Scholarship</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-scholarships" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Manage Scholarships">
                                        <HiOutlineAcademicCap size={30} />
                                        <span className="is-drawer-close:hidden">Manage Scholarships</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-users" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Manage Users">
                                        <HiOutlineUsers size={30} />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/analytics" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Analytics">
                                        <HiOutlineChartBar size={30} />
                                        <span className="is-drawer-close:hidden">Analytics</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {userData?.role === 'Moderator' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/all-reviews" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Reviews">
                                        <MdOutlineReviews size={30} />
                                        <span className="is-drawer-close:hidden">Reviews</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manage-applications" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Manage Applications">
                                        <MdOutlineManageAccounts size={30} />
                                        <span className="is-drawer-close:hidden">Manage Applications</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {userData?.role === 'Student' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/my-reviews" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="Reviews">
                                        <MdOutlineReviews size={30} />
                                        <span className="is-drawer-close:hidden">My Reviews</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-applications" className={({ isActive }) => `${isActive ? activeLink : ""} is-drawer-close:tooltip is-drawer-close:tooltip-right`} data-tip="My Applications">
                                        <MdOutlineDescription size={30} />
                                        <span className="is-drawer-close:hidden">My Applications</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;