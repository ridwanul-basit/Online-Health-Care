import React from 'react';
import { Link, NavLink } from 'react-router';


const Navbar = () => {

    const links= <>
    <NavLink  to="/" className={({ isActive }) =>`px-6 ${isActive ? 'btn rounded-2xl bg-[rgb(23,106,229)] text-white  text-center mr-2' : 'text-gray-600'}`}> Home
           </NavLink>
               <NavLink to={`/schedule`} className={({ isActive }) =>`px-6 ${isActive ? 'btn rounded-2xl bg-[rgb(23,106,229)] text-white  text-center mr-2' : 'text-gray-600'}`}>My-Bookings</NavLink>
               <NavLink to={`/questions`} className={({ isActive }) =>`px-6 ${isActive ? 'btn rounded-2xl bg-[rgb(23,106,229)] text-white  text-center mr-2' : 'text-gray-600'}`}>Blogs</NavLink>
               <NavLink to={`/user`} className={({ isActive }) =>`px-6 ${isActive ? 'btn rounded-2xl bg-[rgb(23,106,229)] text-white  text-center mr-2' : 'text-gray-600'}`}>User Details</NavLink>
    </>
    return (
        <div>
            <div className="navbar lg:w-10/12 mx-auto py-5 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <Link to={`/`} ><div className='flex gap-3  place-items-center'>
      {/* <img src={icon} alt="" /> */}
      <h1 className='text-3xl font-bold'>Online Health Care</h1>
    </div></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className=" px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end ">
    <a className="btn rounded-3xl bg-[rgb(23,106,229)] text-white">Emergency</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;