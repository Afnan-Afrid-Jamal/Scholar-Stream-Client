import React from 'react';
import logo from '/Logo.png'
import { Link, NavLink } from 'react-router';

const Navbar = () => {

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "bg-blue-500 text-white"
            : "";

    return (
        <div className="bg-secondary shadow-sm">
            <div className="navbar max-w-11/12 mx-auto">

                {/* LEFT: Logo + Mobile Menu */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `${navLinkClass({ isActive })} text-black`}
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/all-scholarships"
                                    className={({ isActive }) => `${navLinkClass({ isActive })} text-black`}
                                >
                                    All Scholarships
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) => `${navLinkClass({ isActive })} text-black`}
                                >
                                    Dashboard
                                </NavLink>
                            </li>

                            <li className="flex flex-row justify-between my-3 items-center gap-3">
                                <Link
                                    to="/login"
                                    className="flex-1 text-center px-5 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="flex-1 text-center px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* LOGO */}
                    <Link to="/" className='flex items-center justify-center gap-2 ml-5'>
                        <img src={logo} alt="logo" className='w-10 h-10 border-2 border-white rounded-full' />
                        <h2 className='text-xl md:text-2xl lg:text-2xl font-bold text-white border-white border-y-2'>SCHOLAR STREAM</h2>
                    </Link>
                </div>

                {/* CENTER: NAV LINKS (DESKTOP) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white">

                        <li>
                            <NavLink to="/" className={({ isActive }) => `${navLinkClass({ isActive })} text-white`}>Home</NavLink>
                        </li>

                        <li>
                            <NavLink to="/all-scholarships" className={({ isActive }) => `${navLinkClass({ isActive })} text-white`}>
                                All Scholarships
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => `${navLinkClass({ isActive })} text-white`}>
                                Dashboard
                            </NavLink>
                        </li>

                    </ul>
                </div>

                {/* RIGHT: LOGIN / REGISTER (DESKTOP) */}
                <div className="navbar-end hidden lg:flex gap-3">
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/register" className="btn">Register</Link>
                </div>

            </div>
        </div>
    );
};

export default Navbar;
