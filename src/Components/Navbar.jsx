import React from 'react';
import { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';
import { CiDark, CiLight } from "react-icons/ci";
const Navbar = () => {
    const {user, Logout}=use(AuthContext)
    const[mode,setMode]=useState("light")

  useEffect(()=>{
 document.documentElement.setAttribute("data-theme",mode)

  },[mode])

const change=()=>{
  if(mode==="light"){
    setMode("dark")
  }
  else{
    setMode("light")
  }
}
  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/add-transaction">Add Transaction</NavLink></li>
      <li><NavLink to="/my-transaction">My Transaction</NavLink></li>
      <li><NavLink to="/report">Reports</NavLink></li>
    </>
  );


const handleLogout=()=>{
  Logout()
  .then(()=>{toast.success("Logout Successfully")})
  .catch(error=>{toast.error(error.message)})
}

  return (
    <div className="bg-base-100 shadow-sm">
     
      <div className="navbar w-11/12 mx-auto">
     
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="font-bold text-xl">Fin<span className="text-primary">Ease</span></a>
        </div>

       
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>

       
        <div className="navbar-end">
          <div className="flex items-center gap-4">
          <Link to={'/profile'}>
           {
            user ?  <img
              src={user?.photoURL}
              alt="User"
              className="w-12 h-12 rounded-full"
            />:""
           }
          </Link>
           
          {
            user?<button onClick={handleLogout} className='px-2 py-1.5 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'>Logout</button>: 
            <div className='flex gap-3'> 
              <Link className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"  to={'/login'}>
            Login 
            </Link>

            <Link className="px-3 py-2 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"  to={'/register'}>
            SignUp
            </Link>
            
            </div>
           
            
          }
          <button className="text-blue-700 font-bold text-2xl" onClick={change}>
  {mode === "light" ? <CiDark /> : <CiLight />}
</button>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Navbar;
