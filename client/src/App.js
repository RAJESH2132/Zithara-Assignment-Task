import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import SortButton from "./components/SortButton/SortButton";
import TableHeader from "./components/TableHeader/TableHeader";
import TableRow from "./components/TableRow/TableRow";
import Pagination from "./components/Pagination/Pagination";
import "./App.css"; // Import CSS file for styling

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset currentPage when performing a new search
  };

  const handleSort = (sortField) => {
    if (sortBy === sortField) {
      setCustomers(
        (prevCustomers) => [...prevCustomers].reverse() // Reverse the array to toggle sorting order
      );
    } else {
      setSortBy(sortField);
      setCurrentPage(1); // Reset currentPage when changing sorting criteria
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = customers
    .filter(
      (customer) =>
        customer.customer_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="container">
      <h1 className="title">Customer List</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="sort">
        <SortButton onClick={() => handleSort("date")} label="Sort by Date" />
        <SortButton onClick={() => handleSort("time")} label="Sort by Time" />
      </div>
      <table className="table">
        <TableHeader />
        <tbody>
          {currentRecords.map((customer, index) => (
            <TableRow key={index} customer={customer} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(customers.length / recordsPerPage)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
