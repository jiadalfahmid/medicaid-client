import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import MedLoader from "../../Components/MedLoader/MedLoader";

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
        <MedLoader />
      ) : (
        <div className="w-full">
          {/* Mobile View - Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {payments.map(payment => (
              <div key={payment._id} className="p-4 bg-white border rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700 truncate mr-2">ID: {payment._id}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {payment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Email:</span> {payment.userEmail}</p>
                <p className="text-sm text-gray-600 mb-3"><span className="font-medium">Amount:</span> ${payment.price}</p>
                {payment.status === "pending" && (
                  <button
                    onClick={() => handleAcceptPayment(payment._id)}
                    aria-label="Accept Payment"
                    className="w-full bg-primary hover:bg-accent text-white p-2 rounded-lg min-h-[44px]"
                  >
                    Accept Payment
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-soft overflow-hidden border border-slate-100">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                    <th className="px-6 py-4 font-semibold">Payment ID</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold text-right">Amount</th>
                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{payment._id}</td>
                      <td className="px-6 py-4 text-slate-500">{payment.userEmail}</td>
                      <td className="px-6 py-4 text-right font-semibold text-primary">${payment.price}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${payment.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {payment.status === "pending" && (
                          <button
                            onClick={() => handleAcceptPayment(payment._id)}
                            aria-label="Accept Payment"
                            className="btn btn-sm btn-primary text-white shadow-sm hover:shadow-md transition-shadow"
                          >
                            Accept
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
