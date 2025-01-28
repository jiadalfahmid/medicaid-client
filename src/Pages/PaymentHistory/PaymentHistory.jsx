import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/payments/${user?.email}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err));
  }, [axiosSecure, user]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-primary mb-6">Payment History</h2>

      <div className="overflow-x-auto">
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
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment.transactionId} className="border border-base-300 bg-base-100 hover:bg-secondary">
                  <td className="border border-base-300 p-3 text-center">{index + 1}</td>
                  <td className="border border-base-300 p-3">{payment.transactionId}</td>
                  <td className="border border-base-300 p-3">${payment.price}</td>
                  <td className="border border-base-300 p-3">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="border border-base-300 p-3 text-center">
                    <span
                      className={`badge badge-sm ${
                        payment.status === "pending"
                          ? "bg-yellow-200 text-yellow-500"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-4">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
