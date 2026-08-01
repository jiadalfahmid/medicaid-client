import React, { useEffect, useState } from "react";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const DiscountProductsCarousel = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  
  const fetchDiscountMedicines = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get("/discount-medicines");
      setMedicines(response.data.medicines);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscountMedicines();
  }, []);

  if (loading) {
    return <SkeletonLoader type="card" count={4} />;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
        <p>{error}</p>
        <button onClick={fetchDiscountMedicines} className="btn btn-sm btn-outline btn-error mt-2">Retry</button>
      </div>
    );
  }

  return (
    <div className="carousel carousel-center w-full space-x-6 pb-8">
      {medicines.map((medicine) => (
        <div className="carousel-item" key={medicine._id}>
          <div className="card relative w-72 bg-white shadow-soft hover:shadow-hover border border-slate-100 transition-all duration-300 rounded-3xl overflow-hidden group">
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="badge badge-error text-white font-bold px-3 py-3 rounded-full shadow-lg border-2 border-white">
                -{medicine.discountPercentage}%
              </span>
            </div>
            
            <figure className="h-48 bg-slate-50 relative overflow-hidden p-6">
              <img
                src={medicine.image} 
                alt={medicine.medicineName}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </figure>
            
            <div className="card-body p-6">
              <h3 className="text-xl font-bold text-slate-800 leading-tight">{medicine.medicineName}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mt-1">{medicine.shortDescription}</p>
              
              <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-50">
                <div>
                  <p className="text-xs text-slate-400 line-through mb-1">${medicine.fullStripPrice}</p>
                  <p className="text-2xl font-bold text-primary">
                    ${(medicine.fullStripPrice - (medicine.fullStripPrice * (medicine.discountPercentage / 100))).toFixed(2)}
                  </p>
                </div>
                <Link to="/shop" className="btn btn-circle btn-primary btn-sm text-white shadow-md hover:scale-110 transition-transform">
                  <ShoppingCart size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountProductsCarousel;
