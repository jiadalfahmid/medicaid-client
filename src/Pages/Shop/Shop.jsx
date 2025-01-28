import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "./../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Shop = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const userEmail = user?.email;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
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
      const response = await axios.get(`${API_BASE}/medicines`, {
        params: { search, category: category, sort, page, limit },
      });

      // Ensure numerical values are parsed as numbers
      const updatedProducts = response.data.medicine.map(product => ({
        ...product,
        perUnitPrice: Number(product.perUnitPrice),
        fullStripPrice: Number(product.fullStripPrice),
        discountPercentage: Number(product.discountPercentage),
        availableQuantity: Number(product.availableQuantity),
        unitPerStrip: Number(product.unitPerStrip),
      }));

      setProducts(updatedProducts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError(error);
      toast.error("Failed to fetch Products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE}/categories/name`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddToCart = async (product) => {
    if (!userEmail) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    const cartItem = {
      productId: product?._id,
      productImage: product?.image,
      productName: product?.medicineName,
      medicineGenericName: product?.medicineGenericName,
      price: Number(product?.fullStripPrice),
      quantity: 1,
      userEmail: userEmail,
      massUnitValue: product?.massUnitValue,
      itemMassUnit: product?.itemMassUnit,
      companyName: product?.companyName,
      discountPercentage: Number(product?.discountPercentage),
    };

    try {
      const response = await axiosSecure.post(`/cart`, cartItem);
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product?.medicineName} added to cart!`);
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      toast.error("Failed to add to cart.");
    }
  };

  // View Product Details
  const handleViewDetails = (medicine) => {
    const {
      medicineName,
      image,
      detailedDescription,
      discountPercentage,
      companyName,
      category,
      perUnitPrice,
      availableQuantity,
      unitPerStrip,
      fullStripPrice,
      quantityType,
      massUnitValue,
      itemMassUnit,
    } = medicine;
    const { useCase, appliance, benefits, sideEffects } = detailedDescription;

    Swal.fire({
      title: `${medicineName} ${massUnitValue} ${itemMassUnit}`,
      html: `
        <img src="${image}" alt="${medicineName}" class="w-full mb-4" />
        <div class="flex items-center justify-between mb-4 text-xl">
        <p class="text-left font-bold">${category}</p>
        <div className="">
            <span class="text-bold">$${Number(fullStripPrice).toFixed(2)}</span>
            ${
              Number(discountPercentage) > 0
                ? `<span class="bg-blue-200 text-blue-500 px-2 py-1 badge badge-lg">
                ${discountPercentage}% OFF
              </span>`
                : ""
            }
          </div>
        </div>
        <p class="text-left font-bold">Manufacturers:</p>
        <p class="text-left mb-4">${companyName}</p>
        
        <p class="text-left font-bold">Use Case:</p>
        <p class="text-left mb-4">${useCase}</p>
        
        <p class="text-left font-bold">How to Use:</p>
        <p class="text-left mb-4">${appliance}</p>
        
        <p class="text-left font-bold">Benefits:</p>
        <p class="text-left mb-4">${benefits}</p>
        
        <p class="text-left font-bold">Side Effects:</p>
        <p class="text-left mb-4">${sideEffects}</p>
    
        <div class="mt-4">
  <table class="w-full text-left border">
    <tbody>
      <tr>
        <th class="font-bold py-2 px-4 border-b">Available Quantity:</th>
        <td class="py-2 px-4 border-b">${Number(availableQuantity)} ${quantityType}</td>
      </tr>
      <tr>
        <th class="font-bold py-2 px-4 border-b">Price per Unit:</th>
        <td class="py-2 px-4 border-b">$${Number(perUnitPrice).toFixed(2)}</td>
      </tr>
      <tr>
        <th class="font-bold py-2 px-4 border-b">Units per Strip:</th>
        <td class="py-2 px-4 border-b">${Number(unitPerStrip)}</td>
      </tr>
      <tr>
        <th class="font-bold py-2 px-4 border-b">Price per Strip:</th>
        <td class="py-2 px-4">$${Number(fullStripPrice).toFixed(2)}</td>
      </tr>
    </tbody>
  </table>
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
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      {isLoading && <p>Loading products...</p>}
      {error && <p>Error fetching products</p>}

      {!isLoading && products?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm md:text-base">
            <thead>
              <tr className="bg-secondary">
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price Per Unit</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product?._id} className="border hover:bg-secondary">
                  <td className="p-2 flex justify-center items-center">
                    <img
                      src={product?.image}
                      alt={product?.medicineName}
                      className="w-32 h-32 object-cover rounded-md relative"
                    />
                    {Number(product?.discountPercentage) > 0 && (
                      <span className="bg-blue-200 text-blue-500 px-2 py-1 badge badge-lg absolute  mb-24 mr-16">
                        {product?.discountPercentage}% OFF
                      </span>
                    )}
                  </td>
                  <td className="p-2 border">
                    {product?.medicineName} {product?.massUnitValue}{" "}
                    {product?.itemMassUnit}
                  </td>
                  <td className="p-2 border">{product?.category}</td>
                  <td className="p-2 text-right lg:pr-8">
                    ${Number(product?.perUnitPrice).toFixed(2)}
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="bg-primary hover:bg-accent text-white p-2 rounded-lg"
                    >
                      <IoEyeOutline className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary hover:bg-accent text-white p-2 rounded-lg"
                    >
                      <IoCartOutline className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No products available</p>
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
