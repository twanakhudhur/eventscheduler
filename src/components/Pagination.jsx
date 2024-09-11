import React from "react";

export default function Pagination({ pagination, handlePageChange }) {
  return (
    <>
      {pagination.hasPreviousPage && (
        <button
          className="join-item btn"
          onClick={() => handlePageChange(pagination.currentPage - 1)}
        >
          &lt;
        </button>
      )}
      {Array.from({ length: pagination.totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`join-item btn ${
            pagination.currentPage === index + 1 ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      {pagination.hasNextPage && (
        <button
          className="join-item btn"
          onClick={() => handlePageChange(pagination.currentPage + 1)}
        >
          &gt;
        </button>
      )}
    </>
  );
}
