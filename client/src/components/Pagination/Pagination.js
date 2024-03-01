// import React from "react";
// import "./Pagination.css";

// const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
//   return (
//     <div className="pagination">
//       {Array.from({ length: totalPages }, (_, i) => (
//         <button
//           key={i}
//           onClick={() => handlePageChange(i + 1)}
//           className={currentPage === i + 1 ? "page-btn active" : "page-btn"}
//         >
//           {i + 1}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;
import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? "page-btn active" : "page-btn"}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
