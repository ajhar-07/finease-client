import React, { useState } from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";

import { use } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";

const Register = () => {
    const {user,UserRegister,LoginwithGoogle}=use(AuthContext)
    const [showpass,setShowPass]=useState(false)
    const handleregister=(e)=>{
        e.preventDefault()
        // const displayName=user.displayName
        const name=e.target.name.value;
        const email=e.target.email.value;
        const photourl=e.target.photourl.value;
        const password=e.target.password.value;
        const NewUser={name,email,photourl,password}
        const lowercase = /[a-z]/; 
        const uppercase = /[A-Z]/; 
        const sixdigit = /^.{6,}$/; 

        if(!sixdigit.test(password)){
          return toast.error("Passsword will be 6 Digit or longer")
        }

        if(!lowercase.test(password)){
          return toast.error("Must need a Lowercase")
        }
      if(!uppercase.test(password)){
          return toast.error("Must need a Uppercase")
      }
        console.log(NewUser);
        
        UserRegister(email,password)
        .then(async (result)=>{
          const user=result.user
            console.log(user);
            await updateProfile(user, {
        displayName: name,
        photoURL: photourl || null,
      });

            toast.success("Login Successfull")
        })
        .catch(error=>{
            console.log(error.message);
            toast.error(error.message)
            
        })
    }

 const handleLoginwithGoogle=()=>{
    LoginwithGoogle()
    .then(()=>{
        toast.success("Login Successfull")
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
          Create Account
        </h2>

        <form onSubmit={handleregister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="photourl"
            placeholder="Photo URL"
            className="input input-bordered w-full"
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
            Register
          </button>
        </form>

        <div className="divider text-black">OR</div>

        <button onClick={handleLoginwithGoogle} className="btn w-full flex items-center justify-center gap-2 border">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <p className="text-center mt-4 text-sm text-black">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
      <Toaster/>
    </div>
  );
};

export default Register;
