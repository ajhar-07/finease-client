import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
        role="status"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
