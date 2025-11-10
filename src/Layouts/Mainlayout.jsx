import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const Mainlayout = () => {
    return (
        <div className='bg-base-100'>
        <header>
            <Navbar/>
            </header> 
        <main className='mx-auto w-11/12'>
            <Outlet></Outlet>
        </main>
        <footer>
            <Footer/>
        </footer>
        </div>
    );
};

export default Mainlayout;