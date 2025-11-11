import React, { useState } from "react";
import { use } from "react";

import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Provider/AuthContext";

const Profile = () => {
  const {  user,
     setUser,
     updateUser,
     Logout } = use(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhoto, setNewPhoto] = useState(user?.photoURL || "");

  const handlelogout = () => {
    Logout()
      .then(() =>  toast.success("Logout Successfull"))
      .catch((error) => alert(error.message));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    
    updateUser({ displayName: newName, photoURL: newPhoto })
      .then(() => {
        setUser({
          ...user,
          displayName: newName,
          photoURL: newPhoto,
        });
       toast.success("Profile Updated")
        setIsEditing(false);
      })
      .catch((error) => {
        // console.error(error);
        alert("Failed to update profile: " + error.message);
      });
  };

  return (
    <div data-aos="fade-left">
      {user ? (
        <div className="flex justify-center items-center min-h-scree py-10 px-4">
          <div className="bg-blue-200 text-black shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
            <img
              src={user?.photoURL || user?.user.email}
              alt={user?.displayName || "No name"}
              className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
            />
            <h2 className="text-xl font-semibold mt-4">
              {user?.displayName || "No name"}
            </h2>
            <p className="text-gray-500">{user?.email || "No email"}</p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handlelogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

          
            {isEditing && (
              <form
                onSubmit={handleUpdate}
                className="mt-6 bg-gray-50 p-4 rounded-lg border"
              >
                <h3 className="text-lg font-semibold mb-3">Edit Profile</h3>
                <div className="mb-3">
                  <label className="block text-left text-sm font-medium">
                    Name:
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter your new name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-left text-sm font-medium">
                    Photo URL:
                  </label>
                  <input
                    type="text"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                    className="input input-bordered w-full mt-1"
                    placeholder="Enter new photo URL"
                    required
                  />
                </div>

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen px-4">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center max-w-md">
            <p className="text-gray-700 text-lg font-medium">
              Please{" "}
              <Link
                to={"/login"}
                className="text-blue-600 font-semibold underline"
              >
                Login
              </Link>{" "}
              or{" "}
              <Link
                to={"/register"}
                className="text-blue-600 font-semibold underline"
              >
                Register
              </Link>{" "}
              your account first. <br />
              Without login you can’t see anything here.
            </p>
          </div>
        </div>
      )}
     <Toaster/>
    </div>
  );
};

export default Profile;
