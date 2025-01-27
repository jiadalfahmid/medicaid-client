import React, { useState, useEffect } from 'react';

const MedicineModal = ({ isOpen, onClose, medicine, onSave }) => {
  const [formData, setFormData] = useState({
    medicineName: '',
    medicineGenericName: '',
    shortDescription: '',
    detailedDescription: {
      useCase: '',
      appliance: '',
      benefits: '',
      sideEffects: '',
    },
    image: '',
    category: '',
    companyName: '',
    itemMassUnit: '',
    perUnitPrice: '',
    unitPerStrip: '',
    fullStripPrice: '',
    discountPercentage: '',
    availableQuantity: '',
    quantityType: '',
    massUnitValue: '',
    sellerEmail: '',
  });

  useEffect(() => {
    if (medicine) {
      setFormData(medicine);
    }
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('detailedDescription')) {
      const [key] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-2xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-primary">
          {medicine ? 'Edit Medicine' : 'Add Medicine'}
        </h2>

        <form className="space-y-4">
          {/* Medicine Name */}
          <div>
            <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">Medicine Name</label>
            <input
              id="medicineName"
              type="text"
              name="medicineName"
              className="input input-bordered w-full"
              placeholder="Medicine Name"
              value={formData.medicineName}
              onChange={handleChange}
            />
          </div>

          {/* Generic Name */}
          <div>
            <label htmlFor="medicineGenericName" className="block text-sm font-medium text-gray-700">Generic Name</label>
            <input
              id="medicineGenericName"
              type="text"
              name="medicineGenericName"
              className="input input-bordered w-full"
              placeholder="Generic Name"
              value={formData.medicineGenericName}
              onChange={handleChange}
            />
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              className="textarea textarea-bordered w-full"
              placeholder="Short Description"
              value={formData.shortDescription}
              onChange={handleChange}
            />
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <div>
              <label htmlFor="detailedDescription.useCase" className="block text-sm font-medium text-gray-700">Use Case</label>
              <textarea
                id="detailedDescription.useCase"
                name="detailedDescription.useCase"
                className="textarea textarea-bordered w-full"
                placeholder="Use Case"
                value={formData.detailedDescription.useCase}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="detailedDescription.appliance" className="block text-sm font-medium text-gray-700">Appliance</label>
              <textarea
                id="detailedDescription.appliance"
                name="detailedDescription.appliance"
                className="textarea textarea-bordered w-full"
                placeholder="Appliance"
                value={formData.detailedDescription.appliance}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="detailedDescription.benefits" className="block text-sm font-medium text-gray-700">Benefits</label>
              <textarea
                id="detailedDescription.benefits"
                name="detailedDescription.benefits"
                className="textarea textarea-bordered w-full"
                placeholder="Benefits"
                value={formData.detailedDescription.benefits}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="detailedDescription.sideEffects" className="block text-sm font-medium text-gray-700">Side Effects</label>
              <textarea
                id="detailedDescription.sideEffects"
                name="detailedDescription.sideEffects"
                className="textarea textarea-bordered w-full"
                placeholder="Side Effects"
                value={formData.detailedDescription.sideEffects}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              id="image"
              type="file"
              name="image"
              className="file-input file-input-bordered w-full"
              onChange={handleChange}
            />
          </div>

          {/* Additional Fields */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              id="category"
              type="text"
              name="category"
              className="input input-bordered w-full"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              className="input input-bordered w-full"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="itemMassUnit" className="block text-sm font-medium text-gray-700">Item Mass Unit</label>
            <input
              id="itemMassUnit"
              type="text"
              name="itemMassUnit"
              className="input input-bordered w-full"
              placeholder="Item Mass Unit"
              value={formData.itemMassUnit}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="perUnitPrice" className="block text-sm font-medium text-gray-700">Per Unit Price</label>
            <input
              id="perUnitPrice"
              type="number"
              name="perUnitPrice"
              className="input input-bordered w-full"
              placeholder="Per Unit Price"
              value={formData.perUnitPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="unitPerStrip" className="block text-sm font-medium text-gray-700">Unit Per Strip</label>
            <input
              id="unitPerStrip"
              type="number"
              name="unitPerStrip"
              className="input input-bordered w-full"
              placeholder="Unit Per Strip"
              value={formData.unitPerStrip}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fullStripPrice" className="block text-sm font-medium text-gray-700">Full Strip Price</label>
            <input
              id="fullStripPrice"
              type="number"
              name="fullStripPrice"
              className="input input-bordered w-full"
              placeholder="Full Strip Price"
              value={formData.fullStripPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">Discount Percentage</label>
            <input
              id="discountPercentage"
              type="number"
              name="discountPercentage"
              className="input input-bordered w-full"
              placeholder="Discount Percentage"
              value={formData.discountPercentage}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="availableQuantity" className="block text-sm font-medium text-gray-700">Available Quantity</label>
            <input
              id="availableQuantity"
              type="number"
              name="availableQuantity"
              className="input input-bordered w-full"
              placeholder="Available Quantity"
              value={formData.availableQuantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="quantityType" className="block text-sm font-medium text-gray-700">Quantity Type</label>
            <input
              id="quantityType"
              type="text"
              name="quantityType"
              className="input input-bordered w-full"
              placeholder="Quantity Type"
              value={formData.quantityType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="massUnitValue" className="block text-sm font-medium text-gray-700">Mass Unit Value</label>
            <input
              id="massUnitValue"
              type="number"
              name="massUnitValue"
              className="input input-bordered w-full"
              placeholder="Mass Unit Value"
              value={formData.massUnitValue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="sellerEmail" className="block text-sm font-medium text-gray-700">Seller Email</label>
            <input
              id="sellerEmail"
              type="email"
              name="sellerEmail"
              className="input input-bordered w-full"
              placeholder="Seller Email"
              value={formData.sellerEmail}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicineModal;
