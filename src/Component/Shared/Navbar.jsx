import React, { useContext } from 'react';
import logo from '/Logo.png'
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {

    const { user, handleLogout } = useContext(AuthContext)

    const navLinkClass = ({ isActive }) =>
        isActive ? "bg-blue-500 text-white" : "";


    // Logout
    const handleUserLogout = () => {

        handleLogout()

    }

    return (
        <div className="bg-secondary shadow-sm">
            <div className="navbar max-w-11/12 mx-auto">

                {/* LEFT */}
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52 z-[50]">
                            <li><NavLink to="/" className={({ isActive }) => isActive ? "bg-blue-500 text-white" : "text-black"}>Home</NavLink></li>
                            <li><NavLink to="/all-scholarships" className={({ isActive }) => isActive ? "bg-blue-500 text-white" : "text-black"}>All Scholarships</NavLink></li>

                            {/* মোবাইল স্ক্রিনে যদি লগইন না থাকে তবে এখানেও লগইন বাটন দেখাবে */}
                            {!user && (
                                <div className="flex flex-col gap-2 mt-2 border-t pt-2 lg:hidden">
                                    <li><Link to="/login" className="btn btn-sm btn-primary text-white">Login</Link></li>
                                    <li><Link to="/register" className="btn btn-sm btn-outline btn-primary">Register</Link></li>
                                </div>
                            )}
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2 ml-3">
                        <img src={logo} alt="logo" className="w-10 h-10 rounded-full border-2 border-white" />
                        <h2 className="text-xl font-bold text-white border-y-2 border-white">
                            SCHOLAR STREAM
                        </h2>
                    </Link>
                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2 text-white">
                        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/all-scholarships" className={navLinkClass}>All Scholarships</NavLink></li>
                    </ul>
                </div>

                {/* RIGHT */}

                <div className="navbar-end gap-3">
                    {
                        user ? (
                            <div className="dropdown dropdown-end">

                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-white">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Profile"
                                            src={user?.photoURL || "https://i.ibb.co/mJR9QbR/user-placeholder.png"}
                                        />
                                    </div>
                                </div>


                                <ul tabIndex={0} className="menu menu-md bg-white dropdown-content mt-3 p-2 shadow-xl rounded-box w-52 z-[50]">

                                    <li className="px-4 py-2 font-bold text-gray-700 border-b border-gray-100 mb-2 truncate">
                                        {user?.displayName || "Scholar User"}
                                    </li>

                                    <li>
                                        <Link to="/dashboard" className='text-blue-700'>
                                            <MdSpaceDashboard /> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleUserLogout} className='text-red-700'>
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login" className="btn btn-sm lg:btn-md">Login</Link>
                                <Link to="/register" className="btn btn-sm lg:btn-md btn-outline text-white hover:bg-white hover:text-secondary">Register</Link>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;
