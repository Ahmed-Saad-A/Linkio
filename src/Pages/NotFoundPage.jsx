import React from "react";
import errorPage from "/src/assets/PageNotFound.jpeg";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-100">
        <img
          src={errorPage}
          alt="404 Not Found"
          className="w-1/2 h-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404 Not Found</h1>
        <p className="text-lg text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
