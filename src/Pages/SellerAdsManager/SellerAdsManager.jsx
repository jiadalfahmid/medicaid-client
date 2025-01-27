import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from './../../Hooks/useAxiosSecure';

const SellerAdsManager = () => {
   const axiosSecure = useAxiosSecure();
  const [medicines, setMedicines] = useState([]);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState("pending");
  const [showModal, setShowModal] = useState(false);


  // Fetch all the seller's referred medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axiosSecure.get(`/medicines/referred`);
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        toast.error("Failed to fetch medicines.");
      }
    };

    fetchMedicines();
  }, []);

  // Add advertisement
  const handleAddAdvertisement = async () => {
    if (!image || !description) {
      toast.error("Please provide both image and description.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("discount", discount);
    formData.append("status", status);

    try {
      const response = await axiosSecure.post(`/advertisements`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Advertisement added successfully!");
      setShowModal(false);

      
      setMedicines([...medicines, response.data]);

    } catch (error) {
      console.error("Error adding advertisement:", error);
      toast.error("Failed to add advertisement.");
    }
  };

  // Show SweetAlert Modal
  const showAddAdvertisementModal = () => {
    Swal.fire({
      title: "Add Advertisement",
      html: `
        <input type="file" id="medicineImage" class="swal2-input mb-3" />
        <textarea id="description" placeholder="Enter advertisement description" class="swal2-input mb-3"></textarea>
        <input type="number" id="discount" placeholder="Enter discount percentage" class="swal2-input mb-3" />
      `,
      preConfirm: () => {
        const image = document.getElementById("medicineImage").files[0];
        const description = document.getElementById("description").value;
        const discount = document.getElementById("discount").value;

        if (!image || !description || !discount) {
          Swal.showValidationMessage("Please fill all fields");
          return false;
        }

        return { image, description, discount };
      },
      showCancelButton: true,
      confirmButtonText: "Add Advertisement",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const { image, description, discount } = result.value;

        setImage(image);
        setDescription(description);
        setDiscount(Number(discount));
        handleAddAdvertisement();
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold">Referred Medicines</h2>
      <div className="mt-6">
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((medicine) => (
              <div key={medicine._id} className="border p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">{medicine.medicineName}</h3>
                <p>{medicine.category}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Advertisement Status:</p>
                  <p>{medicine.isAdvertised ? "Active in Slider" : "Not Advertised"}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No referred medicines found.</p>
        )}
      </div>

      <button
        onClick={showAddAdvertisementModal}
        className="mt-6 bg-primary hover:bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Advertise
      </button>
    </div>
  );
};

export default SellerAdsManager;
