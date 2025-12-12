import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Nav/Navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </>
    );
};

export default MainLayout;