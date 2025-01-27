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
        <div className="overflow-x-auto bg-base-100 rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-accent text-white">
              <tr>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id} className="text-center">
                  <td className="border px-4 py-2">
                    <img
                      src={ad.image}
                      alt={ad.name}
                      className="mx-auto w-32 h-32 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{ad.name}</td>
                  <td className="border px-4 py-2">{ad.description}</td>
                  <td className="border px-4 py-2">
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
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDeleteAd(ad._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No advertisements found.</p>
      )}
    </div>
  );
};

export default SellerAdsManager;
