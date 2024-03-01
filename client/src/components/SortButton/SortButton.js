import React from "react";
import "./SortButton.css";

const SortButton = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="sort-btn">
      {label}
    </button>
  );
};

export default SortButton;
