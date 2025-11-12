import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-8xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
         Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
