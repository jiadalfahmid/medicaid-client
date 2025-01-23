import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "./../../Hooks/useAuth";
import "sweetalert2/dist/sweetalert2.min.css";

const Shop = () => {

  
  const { user } = useAuth();
  const userEmail = user?.email;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const limit = 10;

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  // Fetch Products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/products`, {
        params: { search, categoryName: category, sort, page, limit },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error);
      toast.error("Failed to fetch Products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!userEmail) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
  
    const cartItem = {
      productId: product._id,
      productName: product.medicineName, // Include product name
      price: product.price, // Include price
      quantity: 1, // Default quantity to 1
      userEmail: userEmail, 
    };
  
    try {
      const response = await axios.post(`${API_BASE}/cart`, cartItem);
      
      // Ensure cart updates with correct data
      setCart([...cart, { ...product, quantity: 1 }]); 
      toast.success(`${product.medicineName} added to cart!`);
      
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      toast.error("Failed to add to cart.");
    }
  };
  

  // View Product Details
  const handleViewDetails = (medicine) => {
    Swal.fire({
      title: medicine.medicineName,
      html: `
        <img src="${medicine.image}" alt="${medicine.medicineName}" class="w-full mb-4" />
        <p class="text-left">${medicine.detailedDescription}</p>
        <div class="flex items-center justify-between mt-4">
          <span>
            <span class="line-through text-gray-500">$${medicine.price}</span>
            <span class="text-xl font-bold text-black"> $${medicine.offerPrice}</span>
          </span>
          <span class="bg-blue-200 text-blue-500 px-2 py-1 badge badge-lg">${medicine.discount}% OFF</span>
        </div>
      `,
      background: "#eff7fe",
      confirmButtonColor: "#00bfff",
      confirmButtonText: "Add To Cart",
      preConfirm: () => handleAddToCart(medicine),
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 border-r-8 border-r-transparent"
        >
          <option value="">All Categories</option>
          <option value="Medicine">Medicine</option>
          <option value="Diabetic Care">Diabetic Care</option>
          <option value="Skincare">Skincare</option>
          <option value="Baby Care">Baby Care</option>
          <option value="Immunity Boosters">Immunity Boosters</option>
        </select>
      </div>

      {/* Product List */}
      {isLoading && <p>Loading products...</p>}
      {error && <p>Error fetching products</p>}

      {!isLoading && products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm md:text-base">
            <thead>
              <tr className="bg-secondary">
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border hover:bg-secondary">
                  <td className="p-2 flex justify-center items-center">
                    <img
                      src={product.image}
                      alt={product.medicineName}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-2">{product.medicineName}</td>
                  <td className="p-2">{product.categoryName}</td>
                  <td className="p-2 text-right">
                    ${product.offerPrice.toFixed(2)}
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="bg-primary text-white px-3 py-1 rounded-sm"
                    >
                      <IoEyeOutline />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary text-white px-3 py-1 rounded-sm"
                    >
                      <IoCartOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p>No products found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary text-white"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`btn ${
              page === index + 1 ? "btn-primary text-white" : "btn-secondary"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="btn btn-primary text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shop;
