import React from 'react';
import Navbar from '../Component/Shared/Navbar';
import Footer from '../Component/Shared/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-11/12 mx-auto my-8'>
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;