import React, { useState } from 'react';
import MedicineTable from '../../Components/MedicineTable/MedicineTable';
import MedicineModal from '../../Components/MedicineModal/MedicineModal';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'; 
import toast from 'react-hot-toast'; 

const SellerMedicinePage = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null); medicine (for editing)

  
  const handleSave = async (medicineData) => {
    try {
     
      const response = await axiosSecure.post('/medicines', medicineData);
      console.log('Medicine added:', response.data);
      setIsModalOpen(false);

      toast.success('Medicine added successfully!');
    } catch (error) {
      console.error('Error adding medicine:', error);
      toast.error('Failed to add medicine!');
    }
  };

  // Open modal for adding a new medicine
  const openAddNewMedicineModal = () => {
    setCurrentMedicine(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (medicineId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this medicine?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/medicines/${medicineId}`);
        console.log('Medicine deleted:', response.data);

        toast.success('Medicine deleted successfully!');

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
