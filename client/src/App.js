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
  const [sortOption, setSortOption] = useState(""); // Assuming sortOption is managed elsewhere
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    // Fetch data from the server
    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

  useEffect(() => {
    // Filter customers based on search term
    const filtered = customers.filter(
      (customer) =>
        customer.customer_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    let sortedFilteredCustomers = [...filtered];

    // Sort filtered customers based on sort option if it's not empty
    if (sortOption === "date") {
      sortedFilteredCustomers.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
      });
    } else if (sortOption === "time") {
      sortedFilteredCustomers.sort((a, b) => {
        const timeA =
          new Date(a.created_at).getTime() -
          new Date(a.created_at).setHours(0, 0, 0, 0);
        const timeB =
          new Date(b.created_at).getTime() -
          new Date(b.created_at).setHours(0, 0, 0, 0);
        return timeA - timeB;
      });
    }

    setFilteredCustomers(sortedFilteredCustomers);
  }, [customers, searchTerm, sortOption]);

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
    setSortOption(sortField);
    setCurrentPage(1); // Reset currentPage when changing sorting criteria
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCustomers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <div className="container">
      <h1 className="title">Zithara Customer List</h1>
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
        totalPages={Math.ceil(filteredCustomers.length / recordsPerPage)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
