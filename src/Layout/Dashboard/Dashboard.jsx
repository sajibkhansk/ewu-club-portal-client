import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaUserEdit, FaHome, FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    <Outlet></Outlet>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  </div> 
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" className="drawer-overlay bg-orange-300"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-orange-300 text-base-content">
      <li className='text-3xl'><Link to='/dashboard/profile'> <FaUserCircle></FaUserCircle>
         My Profile</Link></li>
      <li className='text-3xl'><Link to='/dashboard/myapply'> <FaUserEdit/> My Apply</Link></li>
      <li><Link></Link></li>
      <div className="divider">OR</div>
      <li className='text-3xl'><NavLink to='/'><FaHome></FaHome> Back to Home</NavLink></li>
    </ul>
      
  </div>
</div>
        </div>
    );
};

export default Dashboard;