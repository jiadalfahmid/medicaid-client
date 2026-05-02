import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SellerAdsManager = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchAds = async () => {
      try {
        const response = await axiosSecure.get(`/ads/${user.email}`);
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
        toast.error("Failed to fetch ads.");
      }
    };

    fetchAds();
  }, [user.email]);

  const handleDeleteAd = async (adId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This advertisement will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axiosSecure.delete(`/ads/${adId}`);
        setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
        toast.success("Advertisement deleted successfully!");
      } catch (error) {
        console.error("Error deleting ad:", error);
        toast.error("Failed to delete ad.");
      }
    }
  };

  const showAddAdvertisementModal = () => {
    Swal.fire({
      title: "Add Advertisement",
      html: `
        <input type="file" id="adImage" class="swal2-input w-9/12 border-none" />
        <textarea id="adName" placeholder="Enter Name" class="swal2-input input w-9/12 input-bordered"></textarea>
        <textarea id="adDescription" placeholder="Enter description" class="swal2-input input w-9/12 input-bordered"></textarea>
      `,
      preConfirm: async () => {
        const imageFile = document.getElementById("adImage").files[0];
        const name = document.getElementById("adName").value.trim();
        const description = document
          .getElementById("adDescription")
          .value.trim();

        if (!imageFile || !description || !name) {
          Swal.showValidationMessage("All fields are required.");
          return false;
        }

        const uploadedImageUrl = await uploadImageToImgBB(imageFile);
        if (!uploadedImageUrl) return false;

        return { uploadedImageUrl, description, name };
      },
      showCancelButton: true,
      confirmButtonText: "Add Ad",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const { uploadedImageUrl, description, name } = result.value;
        handleAddAdvertisement(uploadedImageUrl, description, name);
      }
    });
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.data?.url;
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleAddAdvertisement = async (image, description, name) => {
    toast.success("Advertisement added successfully!");
    location.reload();
    const response = await axiosSecure.post(`/ads`, {
      sellerEmail: user.email,
      name,
      image,
      description,
      status: "pending",
    });

    setAds((prevAds) => [...prevAds, response.data]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Advertisements</h2>
        <button
          onClick={showAddAdvertisementModal}
          className="bg-primary hover:bg-accent text-white py-2 px-4 rounded"
        >
          + Add Advertisement
        </button>
      </div>
      {ads.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-slate-100">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                  <th className="px-6 py-4 font-semibold text-center w-24">Image</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Description</th>
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
                      <button
                        onClick={() => handleDeleteAd(ad._id)}
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
      ) : (
        <p className="text-center text-gray-500">No advertisements found.</p>
      )}
    </div>
  );
};

export default SellerAdsManager;
