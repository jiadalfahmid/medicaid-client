import React, { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "./../../Hooks/useAuth";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { AlertCircle } from "lucide-react";

const MedicineModal = ({ isOpen, onClose, medicine, onSave }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    medicineName: medicine?.medicineName || "",
    medicineGenericName: medicine?.medicineGenericName || "",
    shortDescription: medicine?.shortDescription || "",
    detailedDescription: {
      useCase: medicine?.detailedDescription?.useCase || "",
      appliance: medicine?.detailedDescription?.appliance || "",
      benefits: medicine?.detailedDescription?.benefits || "",
      sideEffects: medicine?.detailedDescription?.sideEffects || "",
    },
    category: medicine?.category || "",
    companyName: medicine?.companyName || "",
    itemMassUnit: medicine?.itemMassUnit || "",
    perUnitPrice: medicine?.perUnitPrice || "",
    unitPerStrip: medicine?.unitPerStrip || "",
    fullStripPrice: medicine?.fullStripPrice || "",
    discountPercentage: medicine?.discountPercentage || "",
    availableQuantity: medicine?.availableQuantity || "",
    quantityType: medicine?.quantityType || "",
    massUnitValue: medicine?.massUnitValue || "",
    sellerEmail: user?.email || "",
    image: medicine?.image || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("detailedDescription")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        detailedDescription: { ...prev.detailedDescription, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // clear error for this field
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.medicineName) newErrors.medicineName = "Medicine Name is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.companyName) newErrors.companyName = "Company Name is required.";
    if (!formData.perUnitPrice) newErrors.perUnitPrice = "Price is required.";
    if (!document.getElementById("image").files[0] && !formData.image) {
      newErrors.image = "Image is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formDataObj = new FormData();
    formDataObj.append("image", imageFile);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: formDataObj,
        }
      );
      const data = await response.json();
      return data.data?.url;
    } catch (error) {
      setErrors(prev => ({ ...prev, image: "Image upload failed." }));
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
      const uploadedImageUrl = await uploadImageToImgBB(imageFile);
      if (!uploadedImageUrl) return;
      formData.image = uploadedImageUrl;
    }

    try {
      // Use onSave instead of directly calling axios if onSave is provided
      if (onSave) {
        await onSave(formData);
      } else {
        const response = await axiosSecure.post("/medicines", formData);
        if (response.status === 200 || response.status === 201) {
          toast.success("Medicine added successfully!");
          onClose();
        } else {
          throw new Error("Failed to save medicine.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const renderInput = (id, label, type = "text", value, placeholder, isTextarea = false) => {
    const isError = !!errors[id];
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {isTextarea ? (
          <textarea
            id={id}
            name={id}
            className={`textarea textarea-bordered w-full focus:outline-none focus:ring-4 transition-shadow ${isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'focus:border-primary focus:ring-primary/50'}`}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        ) : (
          <input
            id={id}
            type={type}
            name={id}
            className={`input input-bordered w-full focus:outline-none focus:ring-4 transition-shadow ${isError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'focus:border-primary focus:ring-primary/50'}`}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        )}
        {isError && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1 font-medium">
            <AlertCircle className="w-4 h-4" /> {errors[id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-full max-w-2xl p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-primary">
          {medicine ? "Edit Medicine" : "Add Medicine"}
        </h2>

        <form className="space-y-2">
          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              name="image"
              className={`file-input file-input-bordered w-full focus:outline-none focus:ring-4 transition-shadow ${errors.image ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'focus:border-primary focus:ring-primary/50'}`}
              onChange={() => setErrors(prev => ({ ...prev, image: "" }))}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-4 h-4" /> {errors.image}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("medicineName", "Medicine Name", "text", formData.medicineName, "Medicine Name")}
            {renderInput("medicineGenericName", "Generic Name", "text", formData.medicineGenericName, "Generic Name")}
            {renderInput("category", "Category", "text", formData.category, "Category")}
            {renderInput("companyName", "Company Name", "text", formData.companyName, "Company Name")}
          </div>

          {renderInput("shortDescription", "Short Description", "text", formData.shortDescription, "Short Description", true)}

          <div className="space-y-4 mt-4 border-t pt-4">
            <h3 className="font-medium text-gray-700">Detailed Description</h3>
            {renderInput("detailedDescription.useCase", "Use Case", "text", formData.detailedDescription.useCase, "Use Case", true)}
            {renderInput("detailedDescription.appliance", "Appliance", "text", formData.detailedDescription.appliance, "Appliance", true)}
            {renderInput("detailedDescription.benefits", "Benefits", "text", formData.detailedDescription.benefits, "Benefits", true)}
            {renderInput("detailedDescription.sideEffects", "Side Effects", "text", formData.detailedDescription.sideEffects, "Side Effects", true)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t pt-4">
            {renderInput("itemMassUnit", "Item Mass Unit", "text", formData.itemMassUnit, "Item Mass Unit")}
            {renderInput("massUnitValue", "Mass Unit Value", "number", formData.massUnitValue, "Mass Unit Value")}
            {renderInput("quantityType", "Quantity Type", "text", formData.quantityType, "Quantity Type")}
            {renderInput("availableQuantity", "Available Quantity", "number", formData.availableQuantity, "Available Quantity")}
            {renderInput("perUnitPrice", "Per Unit Price", "number", formData.perUnitPrice, "Per Unit Price")}
            {renderInput("unitPerStrip", "Unit Per Strip", "number", formData.unitPerStrip, "Unit Per Strip")}
            {renderInput("fullStripPrice", "Full Strip Price", "number", formData.fullStripPrice, "Full Strip Price")}
            {renderInput("discountPercentage", "Discount Percentage", "number", formData.discountPercentage, "Discount Percentage")}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-4">
            <button
              type="button"
              className="btn min-h-[44px] btn-secondary text-white"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn min-h-[44px] btn-primary text-white"
              onClick={handleSubmit}
            >
              Save Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicineModal;
