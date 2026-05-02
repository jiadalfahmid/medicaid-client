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
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-slate-100">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <th className="px-6 py-4 font-semibold text-center w-24">Image</th>
                <th className="px-6 py-4 font-semibold">Medicine Name</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Seller Email</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="bg-slate-100 rounded-xl p-2 w-14 h-14 mx-auto flex items-center justify-center">
                      <img src={ad.image} alt={ad.name} className="max-h-full max-w-full object-contain rounded" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">{ad.name}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm max-w-xs truncate">{ad.description}</td>
                  <td className="px-6 py-4 text-slate-500">{ad.sellerEmail}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        ad.status === "approved"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : ad.status === "rejected"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={ad.status}
                      onChange={(e) => updateAdStatus(ad._id, e.target.value)}
                      className="p-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
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
    </div>
  );
};

export default AdminAdsManager;
