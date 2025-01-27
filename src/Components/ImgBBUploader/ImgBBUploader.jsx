import React, { useState } from "react";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ImgBBUploader = ({ onUploadSuccess }) => {
   const axiosSecure = useAxiosSecure();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setUploading(true);
    try {
      const response = await axiosSecure.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = response.data.data.url;
      toast.success("Image uploaded successfully!");
      onUploadSuccess(imageUrl);
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <input type="file" onChange={handleImageChange} className="mb-2" />
      <button
        onClick={handleUpload}
        disabled={!image || uploading}
        className="bg-accent text-white py-2 px-4 rounded disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default ImgBBUploader;
