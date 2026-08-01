import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import MedLoader from "../../Components/MedLoader/MedLoader";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Change this user's role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00ccff",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, change role!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/users/role/${id}`, {
            role: newRole,
          });

          if (response.status === 200) {
            Swal.fire({
              title: "Success!",
              text: "Role updated successfully.",
              icon: "success",
              confirmButtonColor: "#00bfff",
            });
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === id ? { ...user, role: newRole } : user
              )
            );
          }
        } catch (err) {
          Swal.fire("Error", "Failed to update role", "error");
        }
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#00ccff",
      confirmButtonText: "Yes, delete user!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${id}`);
          Swal.fire("Deleted!", "User has been removed.", "success");
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } catch (err) {
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  if (loading) return <MedLoader />;
  if (error) return <div className="text-center text-red-500 bg-red-50 p-4 rounded-xl">{error}</div>;

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-slate-100">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{user.name}</td>
                  <td className="px-6 py-4 text-slate-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="p-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-sm btn-error text-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
