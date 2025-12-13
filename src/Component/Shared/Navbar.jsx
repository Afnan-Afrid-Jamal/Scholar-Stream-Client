import React, { useContext } from 'react';
import logo from '/Logo.png'
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/AuthContext';

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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li><NavLink to="/" className={({ isActive }) => `${navLinkClass({ isActive })} text-black`}>Home</NavLink></li>
                            <li><NavLink to="/all-scholarships" className={({ isActive }) => `${navLinkClass({ isActive })} text-black`}>All Scholarships</NavLink></li>
                            {
                                user ? (
                                    <div className="dropdown dropdown-end">

                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            <li><button onClick={handleUserLogout}>Logout</button></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="hidden lg:flex gap-3">
                                        <Link to="/login" className="btn">Login</Link>
                                        <Link to="/register" className="btn">Register</Link>
                                    </div>
                                )
                            }
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
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><button onClick={handleUserLogout}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className="hidden lg:flex gap-3">
                                <Link to="/login" className="btn">Login</Link>
                                <Link to="/register" className="btn">Register</Link>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;
