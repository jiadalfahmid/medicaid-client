import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const response = await axiosSecure.get("/all-payments");
        setPayments(response.data);
        setFilteredPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
        toast.error("Failed to load sales report.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, [axiosSecure]);

  useEffect(() => {
    if (!startDate && !endDate) {
      setFilteredPayments(payments);
      return;
    }

    const filtered = payments.filter((payment) => {
      const paymentDate = new Date(payment.date).setHours(0, 0, 0, 0);
      const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
      const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

      if (start && end) return paymentDate >= start && paymentDate <= end;
      if (start) return paymentDate >= start;
      if (end) return paymentDate <= end;
      return true;
    });

    setFilteredPayments(filtered);
  }, [startDate, endDate, payments]);

  // Handle PDF Download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 15);
    
    const tableColumn = ["Transaction ID", "Buyer Email", "Date", "Status", "Total Price"];
    const tableRows = [];

    filteredPayments.forEach((payment) => {
      const paymentData = [
        payment.transactionId,
        payment.email,
        new Date(payment.date).toLocaleDateString(),
        payment.status,
        `$${payment.price}`
      ];
      tableRows.push(paymentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Sales_Report.pdf");
  };

  // Handle CSV Download
  const handleDownloadCSV = () => {
    const headers = ["Transaction ID", "Buyer Email", "Date", "Status", "Total Price"];
    const rows = filteredPayments.map(payment => [
      payment.transactionId,
      payment.email,
      new Date(payment.date).toLocaleDateString(),
      payment.status,
      payment.price
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Sales_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Excel Download
  const handleDownloadExcel = () => {
    const data = filteredPayments.map(payment => ({
      "Transaction ID": payment.transactionId,
      "Buyer Email": payment.email,
      "Date": new Date(payment.date).toLocaleDateString(),
      "Status": payment.status,
      "Total Price": payment.price
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    XLSX.writeFile(workbook, "Sales_Report.xlsx");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sales Report</h2>
      
      {/* Date Filters & Export Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input 
              type="date" 
              className="border p-2 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input 
              type="date" 
              className="border p-2 rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={handleDownloadPDF} className="btn btn-primary text-white">
            Download PDF
          </button>
          <button onClick={handleDownloadCSV} className="btn btn-secondary">
            Download CSV
          </button>
          <button onClick={handleDownloadExcel} className="btn bg-green-600 hover:bg-green-700 text-white">
            Download Excel
          </button>
        </div>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <p>Loading sales report...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-base-300">
            <thead>
              <tr className="bg-primary text-white font-semibold">
                <th className="border border-base-300 p-3">Transaction ID</th>
                <th className="border border-base-300 p-3">Buyer Email</th>
                <th className="border border-base-300 p-3">Date</th>
                <th className="border border-base-300 p-3">Status</th>
                <th className="border border-base-300 p-3">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment._id || payment.transactionId} className="border border-base-300 hover:bg-secondary">
                    <td className="border border-base-300 p-3">{payment.transactionId}</td>
                    <td className="border border-base-300 p-3">{payment.email}</td>
                    <td className="border border-base-300 p-3">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="border border-base-300 p-3 capitalize">{payment.status}</td>
                    <td className="border border-base-300 p-3 text-right">${payment.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-4">
                    No sales found for the selected dates.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
