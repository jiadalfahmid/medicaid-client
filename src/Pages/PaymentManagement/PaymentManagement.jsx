import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from './../../Hooks/useAxiosSecure';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch all payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosSecure.get("/all-payments");
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
        toast.error("Failed to load payments.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Update payment status to 'paid'
  const handleAcceptPayment = async (paymentId) => {
    try {
      const response = await axiosSecure.put("/update-payment-status", { paymentId });
      if (response.status === 200) {
        toast.success("Payment status updated to paid.");
        setPayments(prevPayments =>
          prevPayments.map(payment =>
            payment._id === paymentId ? { ...payment, status: "paid" } : payment
          )
        );
      } else {
        toast.error("Failed to update payment status.");
      }
    } catch (error) {
      console.error("Error accepting payment:", error);
      toast.error("Error updating payment status.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
      {isLoading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Payment ID</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border hover:bg-gray-100">
                  <td className="p-2">{payment._id}</td>
                  <td className="p-2">{payment.email}</td>
                  <td className="p-2 text-right">${payment.price}</td>
                  <td className="p-2 badge bg-accent text-white mx-auto">{payment.status}</td>
                  <td className="p-2">
                    {payment.status === "pending" && (
                      <button
                        onClick={() => handleAcceptPayment(payment._id)}
                        className="bg-primary hover:bg-accent text-white p-2 rounded-lg"
                      >
                        Accept Payment
                      </button>
                    )}
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

export default PaymentManagement;
