import React, { useEffect, useState } from "react";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";

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
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the discounted medicines on mount
  useEffect(() => {
    fetchDiscountMedicines();
  }, []);

  return (
    <div className="discount-products-section">
      <h2 className="text-center text-2xl font-bold my-4">
        Discounted Products
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="carousel carousel-center rounded-box space-x-4">
        {/* Map over the medicines and display them inside the carousel */}
        {medicines.map((medicine) => (
          <div className="carousel-item" key={medicine._id}>
            <div className="card w-72 bg-base-100 shadow-xl">
              <figure>
                <img
                  src={medicine.image} 
                  alt={medicine.medicineName}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-semibold">{medicine.medicineName}</h3>
                <p className="text-sm">{medicine.shortDescription}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-primary">
                    ${medicine.fullStripPrice - (medicine.fullStripPrice / medicine.discountPercentage)}
                  </p>
                  <p className="">{`Discount: ${medicine.discountPercentage}%`}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountProductsCarousel;
