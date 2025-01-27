import React, { useState } from 'react';
import MedicineTable from '../../Components/MedicineTable/MedicineTable';
import MedicineModal from '../../Components/MedicineModal/MedicineModal';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'; // SweetAlert2 import
import toast from 'react-hot-toast'; // React HotToast import

const SellerMedicinePage = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null); // Track current medicine (for editing)

  // Handle save functionality for adding new medicine
  const handleSave = async (medicineData) => {
    try {
      // Make the API call to add the new medicine
      const response = await axiosSecure.post('/medicines', medicineData);
      console.log('Medicine added:', response.data);
      
      // Close the modal after saving the medicine
      setIsModalOpen(false);

      // Show success message with HotToast
      toast.success('Medicine added successfully!');

      // Optionally, you can refetch the medicine list to update the UI
      // fetchMedicines();
    } catch (error) {
      console.error('Error adding medicine:', error);
      toast.error('Failed to add medicine!');
    }
  };

  // Open modal for adding a new medicine
  const openAddNewMedicineModal = () => {
    setCurrentMedicine(null); // No medicine data when adding new
    setIsModalOpen(true);
  };

  // Handle delete functionality with SweetAlert2
  const handleDelete = async (medicineId) => {
    try {
      // Show confirmation alert using SweetAlert2
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this medicine?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        // Make the API call to delete the medicine
        const response = await axiosSecure.delete(`/medicines/${medicineId}`);
        console.log('Medicine deleted:', response.data);

        // Show success toast notification
        toast.success('Medicine deleted successfully!');

        // Optionally, you can refetch the medicine list to update the UI
        // fetchMedicines();
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
      toast.error('Failed to delete medicine!');
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-primary">Medicines</h1>
        <button
          onClick={openAddNewMedicineModal}
          className="btn btn-primary text-white"
        >
          + Add New
        </button>
      </div>
      
      <MedicineTable 
        onDelete={handleDelete}
      />
      
      <MedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        medicine={currentMedicine} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default SellerMedicinePage;
