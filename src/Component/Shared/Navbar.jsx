import React from 'react';
import logo from '../../../public/Logo.png'
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div className="bg-secondary shadow-sm">
            <div className="navbar max-w-11/12 mx-auto">
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
                            <li><Link>Home</Link></li>
                            <li><Link>All Scholarships</Link></li>
                            <li><Link>Dashboard</Link></li>

                        </ul>
                    </div>

                    <div className='flex items-center justify-center gap-2'>
                        <img src={logo} alt="logo" className='w-10 h-10 border-2 border-white rounded-full' />
                        <h2 className='text-xl md:text-2xl lg:text-2xl font-bold text-white border-white border-y-2'>SCHOLAR STREAM</h2>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white">
                        <li><Link>Home</Link></li>
                        <li><Link>All Scholarships</Link></li>
                        <li><Link>Dashboard</Link></li>
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    <a className="btn">Login</a>
                    <a className="btn">Register</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
