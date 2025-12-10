import React from 'react';
import Navbar from '../Component/Shared/Navbar';
import Footer from '../Component/Shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <outlet></outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;