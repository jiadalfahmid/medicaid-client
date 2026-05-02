import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "./../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import SkeletonCard from "../../Components/SkeletonCard/SkeletonCard";
import EmptyState from "../../Components/EmptyState/EmptyState";

const Shop = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
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
  const limit = 12;


  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  // Fetch Products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPublic.get(`/medicines`, {
        params: { search, category: category, sort, page, limit },
      });

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
        const response = await axiosPublic.get(
          `/categories/name`
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
      sellerEmail: product.sellerEmail || "seller@medicaid.com",
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
      sellerEmail,
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 border-r-8 border-r-transparent"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product List */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {error && <EmptyState message="Error fetching products" subMessage="Please try again later." />}

      {!isLoading && products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product?._id} className="card bg-white shadow-soft hover:shadow-hover border border-slate-100 transition-all duration-300 rounded-3xl overflow-hidden group">
              {Number(product?.discountPercentage) > 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="badge badge-error text-white font-bold px-3 py-3 rounded-full shadow-lg border-2 border-white">
                    -{product?.discountPercentage}%
                  </span>
                </div>
              )}
              <figure className="h-48 bg-slate-50 relative overflow-hidden p-6 cursor-pointer" onClick={() => handleViewDetails(product)}>
                <img
                  src={product?.image}
                  alt={product?.medicineName}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </figure>
              <div className="card-body p-6">
                <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1 truncate cursor-pointer hover:text-primary" onClick={() => handleViewDetails(product)}>
                  {product?.medicineName} {product?.massUnitValue}{product?.itemMassUnit}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{product?.category}</p>
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-50">
                  <div>
                    {Number(product?.discountPercentage) > 0 ? (
                      <>
                        <p className="text-xs text-slate-400 line-through mb-1">${Number(product?.fullStripPrice).toFixed(2)}</p>
                        <p className="text-xl font-bold text-primary">
                          ${(Number(product?.fullStripPrice) - (Number(product?.fullStripPrice) * (Number(product?.discountPercentage) / 100))).toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-xl font-bold text-primary">
                        ${Number(product?.perUnitPrice).toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ unit</span>
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(product)}
                      aria-label={`View details of ${product?.medicineName}`}
                      className="btn btn-circle btn-ghost btn-sm bg-slate-50 hover:bg-slate-200 text-slate-600 transition-colors"
                    >
                      <IoEyeOutline size={16} />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product?.medicineName} to cart`}
                      className="btn btn-circle btn-primary btn-sm text-white shadow-md hover:scale-110 transition-transform"
                    >
                      <IoCartOutline size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !isLoading ? (
        <EmptyState 
          message="No products found" 
          subMessage="Try adjusting your filters or search query." 
          actionText="Clear Filters" 
          onAction={() => { setSearch(""); setCategory(""); setSort("asc"); }} 
        />
      ) : null}

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          aria-label="Previous Page"
          className="btn btn-primary text-white min-h-[44px] min-w-[44px]"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            aria-label={`Page ${index + 1}`}
            className={`btn min-h-[44px] min-w-[44px] ${
              page === index + 1 ? "btn-primary text-white" : "btn-secondary"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          aria-label="Next Page"
          className="btn btn-primary text-white min-h-[44px] min-w-[44px]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shop;
