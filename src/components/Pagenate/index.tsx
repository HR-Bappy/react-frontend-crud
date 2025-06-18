import React from "react";
import './pagenation.scss'

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}) => {
  const generatePageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
console.log('totalPages',totalPages)
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
      {/* Page Size Dropdown */}
      <div className="d-flex align-items-center">
        <label htmlFor="pageSize" className="me-2 mb-0">
          Rows per page:
        </label>
        <select
          id="pageSize"
          className="form-select form-select-sm"
          style={{ width: "100px" }}
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1); // reset to page 1
          }}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <p>
        Showing page {currentPage} of {totalPages}
      </p>

      {/* Pagination Buttons */}
      <nav>
        <ul className="pagination pagination-sm mb-0">
          {/* First */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(1)}>
              First
            </button>
          </li>

          {/* Prev */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {/* Page Numbers */}
          {generatePageNumbers().map((page, index) => (
            <li
              key={index}
              className={`page-item ${
                page === currentPage ? "active" : typeof page === "string" ? "disabled" : ""
              }`}
            >
              {page === "..." ? (
                <span className="page-link">…</span>
              ) : (
                <button className="page-link" onClick={() => onPageChange(Number(page))}>
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Next */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>

          {/* Last */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(totalPages)}>
              Last
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
