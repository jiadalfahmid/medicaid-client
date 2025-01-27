import React, { useState, useEffect } from 'react';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import useAuth from './../../Hooks/useAuth';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2'; 

const MedicineTable = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);

  // Fetch medicines from the API
  const fetchMedicines = async () => {
    try {
      const { data } = await axiosSecure.get(`/medicines/${user.email}`);
      setMedicines(data.medicines);
    } catch (error) {
      toast.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleEdit = (medicine) => {
    setCurrentMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleDelete = (medicine) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the medicine: ${medicine.medicineName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/medicines/${medicine._id}`);
          setMedicines(medicines.filter((m) => m._id !== medicine._id));
          Swal.fire('Deleted!', 'The medicine has been deleted.', 'success');
        } catch (error) {
          toast.error("Error deleting medicine:", error);
        }
      }
    });
  };


  return (
    <div className="">
      <table className="bg-base-100 min-w-full table-auto border-collapse border border-secondary">
        <thead>
          <tr className="bg-primary text-white">
            <th className="py-2 px-4">Medicine Name</th>
            <th className="py-2 px-4">Generic Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Per Unit Price</th>
            <th className="py-2 px-4">Available Quantity</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {medicines.map((medicine) => (
            <tr key={medicine._id} className="hover:bg-secondary">
              <td className="py-2 px-4">{medicine.medicineName}</td>
              <td className="py-2 px-4">{medicine.medicineGenericName}</td>
              <td className="py-2 px-4">{medicine.category}</td>
              <td className="py-2 px-4">{medicine.perUnitPrice}</td>
              <td className="py-2 px-4">{medicine.availableQuantity}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => handleDelete(medicine)}
                  className="btn btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;
