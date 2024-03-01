import React from "react";
import "./TableRow.css";

const TableRow = ({ customer }) => {
  return (
    <tr>
      <td>{customer.sno}</td>
      <td>{customer.customer_name}</td>
      <td>{customer.age}</td>
      <td>{customer.phone}</td>
      <td>{customer.location}</td>
      <td>{new Date(customer.created_at).toLocaleDateString()}</td>
      <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
    </tr>
  );
};

export default TableRow;
