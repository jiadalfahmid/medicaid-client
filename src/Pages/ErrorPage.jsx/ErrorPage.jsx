import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 text-neutral-content">
      <h1 className="text-4xl font-bold text-error">Oops! Something went wrong.</h1>
      <p className="mt-4 text-xl">The page you're looking for does not exist.</p>
      <button
        onClick={handleHomeRedirect}
        className="mt-6 btn btn-primary"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
