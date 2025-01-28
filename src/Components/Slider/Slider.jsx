import React, { useState, useEffect } from 'react';
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const Slider = () => {
   const axiosPublic = useAxiosPublic();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch approved ads from the API
  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get('/ads/all');
      const approvedAds = response.data.filter(ad => ad.status === 'approved');
      setAds(approvedAds);
    } catch (err) {
      setError('Failed to load ads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="carousel w-full max-h-[450px]">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {ads.length > 0 ? (
        ads.map((ad, index) => (
          <div
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
            key={ad._id} 
          >
            <img
              src={ad.image} 
              alt={ad.name} 
              className="w-full object-cover"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#slide${index === 0 ? ads.length : index}`} className="btn btn-circle">❮</a>
              <a href={`#slide${index + 2 > ads.length ? 1 : index + 2}`} className="btn btn-circle">❯</a>
            </div>
            <div className="absolute left-5 bottom-5 text-white bg-black bg-opacity-50 p-3">
              <h3 className="text-xl font-semibold">{ad.name}</h3>
              <p>{ad.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No approved ads available.</p>
      )}
    </div>
  );
};

export default Slider;
