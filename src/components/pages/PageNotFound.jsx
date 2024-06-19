import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl md:text-9xl font-bold">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-lg mt-4 mb-8 max-w-md text-center">The page you're looking for doesn't exist or has been moved.</p>
      <Link to={"/"} className="text-white bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition duration-300">
        Go back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;

