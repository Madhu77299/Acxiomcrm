import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  return (
    <div className="d-flex align-items-center justify-content-between px-3 py-3 border-top bg-white rounded-bottom">
      <div className="text-muted" style={{ fontSize: "0.8125rem" }}>
        Showing <span className="fw-semibold text-dark">{startItem}</span> to{" "}
        <span className="fw-semibold text-dark">{endItem}</span> of{" "}
        <span className="fw-semibold text-dark">{totalItems}</span> entries
      </div>

      <div className="d-flex align-items-center gap-1">
        <button
          className="btn btn-sm btn-crm-outline p-1"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`btn btn-sm px-2 py-1 ${
              page === currentPage ? "btn-crm-primary" : "btn-crm-outline"
            }`}
            style={{ fontSize: "0.8rem", minWidth: "30px" }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="btn btn-sm btn-crm-outline p-1"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
