import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import News from '../Pages/News';

const Main = () => {
    return (
        <div >
            <News></News>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;