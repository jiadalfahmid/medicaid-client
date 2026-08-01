import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const error = useRouteError();
  const is404 = error?.status === 404;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center bg-white p-8 md:p-12 rounded-3xl shadow-2xl"
      >
        <div className="text-9xl font-black text-slate-100 mb-4">{is404 ? '404' : 'Oops!'}</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          {is404 ? 'Page Not Found' : 'Something went wrong'}
        </h1>
        <p className="text-slate-500 mb-8 overflow-hidden break-words">
          {is404 
            ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
            : error?.statusText || error?.message || "An unexpected error occurred."}
        </p>
        <Link to="/" className="btn btn-primary text-white w-full rounded-full shadow-lg shadow-primary/30">
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
