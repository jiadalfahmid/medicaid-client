import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const CategoryCards = () => {
   const axiosPublic = useAxiosPublic()
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get('/categories');
      setCategories(response.data); 
    } catch (err) {
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="category-cards-section my-8">
      <h2 className="text-center text-2xl font-bold mb-6">Categories</h2>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Loop through the categories and display each card */}
        {categories.slice(0, 5).map((category) => (
          <div className="card w-56 bg-base-100 shadow-xl" key={category._id}>
            <figure>
              <img
                src={category.categoryImage} 
                alt={category.categoryName}
                className="w-32 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="text-xl font-semibold">{category.categoryName}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
