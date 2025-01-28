import React from 'react';

const UnderConstruction = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">🚧 Under Construction 🚧</h1>
        <p className="text-xl text-gray-500 mb-6">
          This page is currently under construction. Please check back later.
        </p>
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;