import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

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
              text: "Item has been deleted.",
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

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full text-left border-collapse bg-base-100">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-secondary">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border border-base-content rounded bg-background text-base-content"
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
  );
};

export default AllUser;
