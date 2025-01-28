import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const InvoicePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [invoice, setInvoice] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    axiosSecure
      .get(`/latest-payment?email=${user?.email}`)
      .then((res) => setInvoice(res.data))
      .catch((err) => console.error("Error fetching invoice:", err));
  }, [axiosSecure, user]);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${invoice?.transactionId}`,
  });

  if (!invoice) {
    return <p className="text-center text-gray-500 mt-10">Loading invoice...</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div ref={invoiceRef} className="bg-white p-6 shadow-lg rounded-lg">
        {/* Header with Logo */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <img src="/logo.png" alt="Logo" className="h-12" />
          <div>
            <h2 className="text-2xl font-semibold text-primary">Invoice</h2>
            <p className="text-gray-500">#{invoice.transactionId}</p>
          </div>
        </div>

        {/* User Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-accent">Billing To:</h3>
          <p className="text-gray-700">{user.displayName || "Anonymous"}</p>
          <p className="text-gray-700">{user.email}</p>
        </div>

        {/* Purchase Details */}
        <table className="w-full border-collapse border border-base-300 mb-6">
          <thead>
            <tr className="bg-base-200">
              <th className="border border-base-300 p-2">Item</th>
              <th className="border border-base-300 p-2">Price</th>
              <th className="border border-base-300 p-2">Quantity</th>
              <th className="border border-base-300 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items?.map((item, index) => (
              <tr key={index} className="border border-base-300">
                <td className="p-2">{item.name}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="text-right">
          <p className="text-lg font-semibold">
            Total: <span className="text-primary">${invoice.price.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="btn btn-primary mt-4 w-full text-white"
      >
        Print / Download PDF
      </button>
    </div>
  );
};

export default InvoicePage;
