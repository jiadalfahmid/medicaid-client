import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../../Components/DashboardNavbar/DashboardNavbar';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from './../../Hooks/useAuth';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {

    const fetchUserRole = async () => {
      try {
        const response = await axiosSecure.get(`/users/${user.email}`);
        setUserRole(response.data.role); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="lg:flex bg-background">
      <div className="min-h-full">
        <DashboardNavbar role={userRole} />
      </div>
      <div className="min-h-full w-full px-6 container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
