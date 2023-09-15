import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';
import useApply from '../hooks/useApply';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [apply]= useApply();
  console.log(apply.length);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => console.log(error));
  }
  const ourNavOption = <>
    <li className="hover:bg-transparent"><Link to="/">Home</Link></li>
    <li className="hover:bg-transparent"><Link to="/applynow">Apply Now</Link></li>
    { user && <li>
    <Link to='/dashboard/profile'>
      <button className="btn btn-sm">
        <div className="badge badge-secondary">Dashboard  +{apply.length || 0}</div>
      </button>
    </Link>
  </li>}
  </>
  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {ourNavOption}
            </ul>
          </div>
          <a href='/' className="btn btn-ghost normal-case text-xl hover:bg-transparent">
            <img className="h-12" src="https://i.ibb.co/XyMF0wT/logoewu.png" alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {ourNavOption}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? <button onClick={handleLogOut} className='btn btn-outline'>Logout</button> : <Link to="/login" className="btn btn-outline">Login</Link>}
        </div>
        <div className="dropdown dropdown-end">
   {user && <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        {user.photoURL ? (
                  <img src={user.photoURL} alt="User Profile" />
                ) : (
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJ5uzamZittLOqysSJNyhD_emWIH_ZDvUBg&usqp=CAU" alt="Default Profile" />
                )}
                        </div>
                    </label>}
    </div>
      </div>
    </div>
  );
};

export default Navbar;
