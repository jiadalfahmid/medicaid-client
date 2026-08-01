import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Cart = () => {
  const axiosSecure = useAxiosSecure();

  const [cartItems, setCartItems] = useState([]);
  const {
    user: { email },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data } = await axiosSecure.get(
        `/cart/${email}`
      );
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axiosSecure.put(`/cart/update/${id}`, {
        quantity: newQuantity,
      });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#00ccff",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/cart/${id}`);
          setCartItems((prev) => prev.filter((item) => item._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Item has been deleted.",
            icon: "success",
            confirmButtonColor: "#00bfff",
          });
        }
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#00ccff",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/cart/clear/${email}`);
          setCartItems([]);
          Swal.fire({
            title: "Deleted!",
            text: "Your Cart has been deleted.",
            icon: "success",
            confirmButtonColor: "#00bfff",
          });
        }
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    return (
      sum +
      (item.discountPercentage > 0
        ? (itemTotal * item.discountPercentage) / 100
        : 0)
    );
  }, 0);

  const finalTotal = totalPrice - totalDiscount;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-primary">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 border-b p-4"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.productName}{" "}
                  <span className="text-gray-500 text-sm">
                    {item.massUnitValue} {item.itemMassUnit}
                  </span>
                </h3>
                <p className="text-sm text-gray-500">{item.companyName}</p>
                <div className="flex items-center gap-2">
                  <span className="text-accent font-bold text-lg">
                    ${item.price}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="btn btn-xs btn-outline"
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                >
                  <FaMinus />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-xs btn-outline"
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  <FaPlus />
                </button>
              </div>
              <button
                className="btn btn-sm text-white btn-error"
                onClick={() => removeItem(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 bg-secondary p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="flex justify-between mt-4">
              <span className="font-semibold">Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Total Discount</span>
              <span>-${totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-primary w-full text-white mt-2"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="btn btn-outline hover:bg-red-500 w-full hover:text-white mt-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
