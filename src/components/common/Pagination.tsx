import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPaginationPages = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 text-sm font-medium bg-muted border border-border rounded-md hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <FaArrowLeft />
      </button>

      {/* Danh sách các số trang */}
      {getPaginationPages().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="p-3">
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
              isActive
                ? "bg-accent text-black border border-accent"
                : "bg-background border border-border"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 text-sm font-medium bg-muted border border-border rounded-md hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
