import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";

const AdminAdsManager = () => {
  const axiosSecure = useAxiosSecure();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const { data } = await axiosSecure.get("/ads/all");
      setAds(data);
    } catch (error) {
      toast.error("Failed to fetch advertisements");
    }
  };

  const updateAdStatus = async (id, newStatus) => {
    try {
      const { data } = await axiosSecure.patch(`/ads/status/${id}`, {
        status: newStatus,
      });

      toast.success(data.message);
      setAds((prevAds) =>
        prevAds.map((ad) => (ad._id === id ? { ...ad, status: newStatus } : ad))
      );
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Banner Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-base-100 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-accent text-white">
              <th className="border p-3">Image</th>
              <th className="border p-3">Medicine Name</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Seller Email</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-b">
                <td className="border p-3">
                  <img src={ad.image} alt={ad.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="border p-3">{ad.name}</td>
                <td className="border p-3">{ad.description}</td>
                <td className="border p-3">{ad.sellerEmail}</td>
                <td className="border p-3">
                  <span
                    className={`badge rounded-full text-sm ${
                      ad.status === "approved"
                        ? "bg-green-200 text-green-700"
                        : ad.status === "rejected"
                        ? "bg-red-200 text-red-700"
                        : "bg-yellow-200 text-yellow-500"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="border p-3">
                  <select
                    value={ad.status}
                    onChange={(e) => updateAdStatus(ad._id, e.target.value)}
                    className="select select-sm select-bordered"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAdsManager;
