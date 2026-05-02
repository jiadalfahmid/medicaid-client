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
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-slate-100">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                  <th className="px-6 py-4 font-semibold">Transaction ID</th>
                  <th className="px-6 py-4 font-semibold">Buyer Email</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment._id || payment.transactionId} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{payment.transactionId}</td>
                      <td className="px-6 py-4 text-slate-500">{payment.email}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(payment.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 capitalize">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${payment.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-primary">${payment.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-slate-500 py-12">
                      <p className="text-lg font-medium">No sales found</p>
                      <p className="text-sm">Try adjusting your date range.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
