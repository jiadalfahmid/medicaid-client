import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MedLoader from "../../Components/MedLoader/MedLoader";
import EmptyState from "../../Components/EmptyState/EmptyState";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosSecure.get("/categories");
        setCategories(response.data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch categories", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Add Category
  const handleAddCategory = () => {
    Swal.fire({
      title: "Add New Category",
      html: `
        <input id="categoryName" class="swal2-input" placeholder="Category Name">
        <input id="categoryImage" class="swal2-input" placeholder="Category Image URL">
      `,
      showCancelButton: true,
      confirmButtonText: "Add",
      preConfirm: () => {
        const categoryName = document.getElementById("categoryName").value;
        const categoryImage = document.getElementById("categoryImage").value;
        if (!categoryName || !categoryImage) {
          Swal.showValidationMessage("Both fields are required");
        }
        return { categoryName, categoryImage };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post("/categories", result.value);
          if (res.data.insertedId) {
            setCategories([...categories, { _id: res.data.insertedId, ...result.value }]);
            Swal.fire("Success", "Category added!", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to add category", "error");
        }
      }
    });
  };

  // Update Category
  const handleUpdateCategory = (category) => {
    Swal.fire({
      title: "Update Category",
      html: `
        <input id="categoryName" class="swal2-input" value="${category.categoryName}" placeholder="Category Name">
        <input id="categoryImage" class="swal2-input" value="${category.categoryImage}" placeholder="Category Image URL">
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const categoryName = document.getElementById("categoryName").value;
        const categoryImage = document.getElementById("categoryImage").value;
        return { categoryName, categoryImage };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/categories/${category._id}`, result.value);
          setCategories(
            categories.map((cat) =>
              cat._id === category._id ? { ...cat, ...result.value } : cat
            )
          );
          Swal.fire("Success", "Category updated!", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to update category", "error");
        }
      }
    });
  };

  // Delete Category
  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/categories/${id}`);
          setCategories(categories.filter((cat) => cat._id !== id));
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete category", "error");
        }
      }
    });
  };

  if (loading) return <MedLoader />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Manage Categories</h1>
        <button
          onClick={handleAddCategory}
          aria-label="Add a new category"
          className="bg-primary hover:bg-accent text-white px-4 py-2 rounded min-h-[44px] min-w-[44px]"
        >
          + Add Category
        </button>
      </div>
      {categories.length === 0 ? (
        <EmptyState message="No Categories Found" subMessage="Click the + Add Category button to create one." />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-primary text-white text-center">
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Category Name</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border">
                  <td className="border px-4 py-2">
                    <img src={category.categoryImage} alt={category.categoryName} loading="lazy" className="h-12 w-12 object-cover rounded mx-auto" />
                  </td>
                  <td className="border px-4 py-2">{category.categoryName}</td>
                  <td className="border px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleUpdateCategory(category)}
                      aria-label={`Edit ${category.categoryName}`}
                      className="bg-primary hover:bg-accent text-white px-4 py-2 rounded min-h-[44px] min-w-[44px]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      aria-label={`Delete ${category.categoryName}`}
                      className="btn btn-error text-white px-4 py-2 rounded min-h-[44px] min-w-[44px]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Categories;
