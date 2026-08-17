import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  scrollToRef?: React.RefObject<HTMLElement | null>;
  isSmoothScroll?: boolean;
}

export const usePagination = <T>({
  data,
  itemsPerPage = 12,
  scrollToRef,
  isSmoothScroll = true,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const currentData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, currentPage, itemsPerPage]);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      if (scrollToRef?.current) {
        scrollToRef.current.scrollIntoView({
          behavior: isSmoothScroll ? "smooth" : "auto",
          block: "start",
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: isSmoothScroll ? "smooth" : "auto",
        });
      }
    }, 50);
  };
  const resetPage = () => setCurrentPage(1);
  return {
    currentPage,
    currentData,
    totalPages,
    handlePageChange,
    resetPage,
    setCurrentPage,
  };
};
