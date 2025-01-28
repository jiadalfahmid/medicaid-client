import React from "react";
import useAuth from "../../Hooks/useAuth"; 

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex items-center mb-6">
          <img
            src={user?.photoURL} 
            alt="Profile"
            className="h-16 w-16 rounded-full mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-primary">{user?.displayName || "Anonymous"}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Additional Profile Info */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-accent">Additional Information</h3>
          {/* You can add more information here as per your requirements */}
          <p className="text-gray-700">Joined on: {new Date(user?.metadata?.creationTime).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
