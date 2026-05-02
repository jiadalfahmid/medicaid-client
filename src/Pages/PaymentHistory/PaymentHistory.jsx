import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import EmptyState from "../../Components/EmptyState/EmptyState";
import MedLoader from "../../Components/MedLoader/MedLoader";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/payments/${user?.email}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err))
      .finally(() => setLoading(false));
  }, [axiosSecure, user]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-primary mb-6">Payment History</h2>

      {loading ? (
        <MedLoader />
      ) : payments.length > 0 ? (
        <div className="w-full">
          {/* Mobile View - Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {payments.map((payment, index) => (
              <div key={payment.transactionId} className="p-4 bg-white border rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700 truncate mr-2">TXN: {payment.transactionId}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                    {payment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Amount:</span> ${payment.price}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Date:</span> {new Date(payment.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-base-300">
              <thead>
                <tr className="bg-primary text-white font-semibold">
                  <th className="border border-base-300 p-3">#</th>
                  <th className="border border-base-300 p-3">Transaction ID</th>
                  <th className="border border-base-300 p-3">Amount</th>
                  <th className="border border-base-300 p-3">Date</th>
                  <th className="border border-base-300 p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.transactionId} className="border border-base-300 bg-base-100 hover:bg-secondary">
                    <td className="border border-base-300 p-3 text-center">{index + 1}</td>
                    <td className="border border-base-300 p-3">{payment.transactionId}</td>
                    <td className="border border-base-300 p-3">${payment.price}</td>
                    <td className="border border-base-300 p-3">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="border border-base-300 p-3 text-center">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState message="No payment history found." />
      )}
    </div>
  );
};

export default PaymentHistory;
