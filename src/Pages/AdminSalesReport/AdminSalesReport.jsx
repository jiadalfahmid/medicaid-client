import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datetime";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "react-datetime/css/react-datetime.css";

const AdminSalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch the sales data with optional date range filter
  const fetchSalesData = async (startDate, endDate) => {
    try {
      const params = {
        ...(startDate && { startDate: startDate.toISOString() }),
        ...(endDate && { endDate: endDate.toISOString() }),
      };
      const response = await fetch(`/sales-report?${new URLSearchParams(params)}`);
      const data = await response.json();
      setSalesData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Handle date filter change
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = salesData.filter(
        (sale) =>
          new Date(sale.date) >= new Date(startDate) &&
          new Date(sale.date) <= new Date(endDate)
      );
      setFilteredData(filtered);
    }
  };

  // Download data as Excel
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, "sales_report.xlsx");
  };

  // Download data as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 10, 10);
    filteredData.forEach((sale, index) => {
      doc.text(`${index + 1}. ${sale.medicineName} - ${sale.totalPrice}`, 10, 20 + index * 10);
    });
    doc.save("sales_report.pdf");
  };

  // Set up CSV export
  const csvReport = {
    data: filteredData,
    headers: [
      { label: "Medicine Name", key: "medicineName" },
      { label: "Seller Email", key: "sellerEmail" },
      { label: "Buyer Email", key: "buyerEmail" },
      { label: "Total Price", key: "totalPrice" },
      { label: "Date", key: "date" },
    ],
    filename: "sales_report.csv",
  };

  useEffect(() => {
    fetchSalesData(startDate, endDate);
  }, [startDate, endDate]);

  const columns = [
    {
      name: "Medicine Name",
      selector: "medicineName",
      sortable: true,
    },
    {
      name: "Seller Email",
      selector: "sellerEmail",
      sortable: true,
    },
    {
      name: "Buyer Email",
      selector: "buyerEmail",
      sortable: true,
    },
    {
      name: "Total Price",
      selector: "totalPrice",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Sales Report</h2>

      {/* Date Range Picker */}
      <div className="mb-4">
        <label>Start Date:</label>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          placeholder="Select Start Date"
        />
        <label className="ml-4">End Date:</label>
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          placeholder="Select End Date"
        />
        <button
          onClick={handleFilter}
          className="ml-4 bg-primary text-white p-2 rounded-lg"
        >
          Filter
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        selectableRows
        responsive
        striped
      />

      {/* Export Options */}
      <div className="mt-4">
        <button
          onClick={downloadExcel}
          className="mr-4 bg-primary text-white p-2 rounded-lg"
        >
          Download as Excel
        </button>
        <button
          onClick={downloadPDF}
          className="mr-4 bg-primary text-white p-2 rounded-lg"
        >
          Download as PDF
        </button>
        <CSVLink {...csvReport}>
          <button className="bg-primary text-white p-2 rounded-lg">
            Download as CSV
          </button>
        </CSVLink>
      </div>
    </div>
  );
};

export default AdminSalesReport;
