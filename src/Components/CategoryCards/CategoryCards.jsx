import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

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
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <SkeletonLoader type="card" count={5} />;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
        <p>{error}</p>
        <button onClick={fetchCategories} className="btn btn-sm btn-outline btn-error mt-2">Retry</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.slice(0, 5).map((category) => (
        <Link 
          to={`/category/${category.categoryName}`}
          key={category._id}
          className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-soft hover:shadow-hover border border-slate-100 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-24 h-24 mb-4 rounded-full bg-slate-50 p-4 group-hover:bg-primary/5 transition-colors duration-300">
            <img
              src={category.categoryImage} 
              alt={category.categoryName}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 text-center">{category.categoryName}</h3>
          <span className="text-xs font-semibold text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Explore <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
