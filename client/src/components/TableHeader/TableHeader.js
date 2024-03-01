import React from "react";
import "./TableHeader.css";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Sno</th>
        <th>Customer Name</th>
        <th>Age</th>
        <th>Phone</th>
        <th>Location</th>
        <th>Created At (Date)</th>
        <th>Created At (Time)</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
