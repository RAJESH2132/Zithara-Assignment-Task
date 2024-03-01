import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
