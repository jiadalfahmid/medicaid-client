import React, { useEffect, useState, useRef } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { jsPDF } from "jspdf";

import MedLoader from "../../Components/MedLoader/MedLoader";

const InvoicePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [invoice, setInvoice] = useState(null);
  const invoiceRef = useRef(null);

  useEffect(() => {
    axiosSecure
      .get(`/latest-payment?email=${user?.email}`)
      .then((res) => setInvoice(res.data))
      .catch((err) => console.error("Error fetching invoice:", err));
  }, [axiosSecure, user]);

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    // Header
    doc.setFontSize(24);
    doc.text("Medicaid", 20, 20);
    doc.setFontSize(22);
    doc.text("Invoice", 20, 30);
    doc.setFontSize(12);
    doc.text(`Invoice #${invoice.transactionId}`, 20, 40);

    // User Information
    doc.text(`Billing To: ${user.displayName || "Anonymous"}`, 20, 50);
    doc.text(user.email, 20, 60);

    // Purchase Details
    let y = 70;
    doc.text("Medicines", 20, y);
    doc.text("Quantity", 80, y);
    doc.text("Price", 120, y);
    doc.text("Total", 160, y);

    y += 10;
    invoice.medicineItemNames?.forEach((name, idx) => {
      doc.text(name, 20, y);
      doc.text(`${invoice.itemQuantities[idx]}`, 80, y);
      doc.text(`$${invoice.itemPrices[idx].toFixed(2)}`, 120, y);
      doc.text(`$${(invoice.itemPrices[idx] * invoice.itemQuantities[idx]).toFixed(2)}`, 160, y);
      y += 10;
    });

    // Summary
    y += 10;
    doc.text(`Discount: -$${invoice.totalDiscount.toFixed(2)}`, 120, y);
    y += 10;
    doc.text(`Total: $${invoice.totalPrice.toFixed(2)}`, 120, y);

    // Date
    y += 10;
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 120, y);

    // Save the PDF
    doc.save(`Invoice_${invoice.transactionId}.pdf`);
  };

  if (!invoice) {
    return <MedLoader />;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div ref={invoiceRef} className="bg-white p-6 shadow-lg rounded-lg">
        {/* Header with Logo */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <img src="/favicon.png" alt="Logo" className="h-12" />
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
              <th className="border border-base-300 p-2">Medicines</th>
              <th className="border border-base-300 p-2">Quantity</th>
              <th className="border border-base-300 p-2">Price</th>
              <th className="border border-base-300 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.medicineItemNames?.map((name, idx) => {
              const qty = invoice.itemQuantities?.[idx] || 1;
              const price = invoice.itemPrices?.[idx] || 0;
              return (
                <tr key={idx}>
                  <td className="p-2 border">{name}</td>
                  <td className="p-2 border text-center">{qty}</td>
                  <td className="p-2 border text-right">${price.toFixed(2)}</td>
                  <td className="p-2 border text-right">
                    ${(price * qty).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Summary */}
        <div className="text-right">
          <p className="text-lg font-semibold">
            Discount: <span className="text-red-500">-${(invoice.totalDiscount || 0).toFixed(2)}</span>
          </p>
          <p className="text-lg font-semibold">
            Total: <span className="text-primary">${(invoice.totalPrice || invoice.price || 0).toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPdf}
        className="btn btn-primary mt-4 w-full text-white"
      >
        Download PDF
      </button>
    </div>
  );
};

export default InvoicePage;
