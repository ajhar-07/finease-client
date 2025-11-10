import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

import { AuthContext } from "../Provider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [showpass,setShowPass]=useState(false)
    const {user,UserLogin,LoginwithGoogle}=use(AuthContext) 
    const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";


const handleUserLogin=(e)=>{
  e.preventDefault()
  const email=e.target.email.value;
  const password=e.target.password.value;
  const loginUser={email,password}
  UserLogin(email,password)
  .then(result=>{console.log(result.user);
    toast.success("Login Successfull")
     navigate(from, { replace: true });
  })
  .catch(error=>{console.log(error.message)
    toast.error(error.message)
  })
}

const handleLoginwithGoogle=()=>{
    LoginwithGoogle()
    .then(()=>{
        toast.success("Login Successfull")
         navigate(from, { replace: true });
    })
    .catch(error=>{
        console.log(error);
        
        toast.error(error.message)
    })
 }


  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleUserLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
           <div className="relative">
                       <input
                         type={showpass ? "text" : "password"}
                         name="password"
                         placeholder="Enter your password"
                         required
                         className="input input-bordered w-full pr-12"
                       />
                       <button
                         type="button"
                         onClick={() => setShowPass(!showpass)}
                         className="absolute right-3 top-3 text-sm text-gray-500 hover:text-primary"
                       >
                         {showpass ? <FaEyeSlash />: <FaEye /> }
                       </button>
                     </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleLoginwithGoogle} className="btn w-full flex items-center justify-center gap-2 border">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="text-center mt-4 text-sm">
          New to Fin<span className="text-primary font-semibold">Ease</span>?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
      <Toaster/>
    </div>
  );
};

export default Login;
