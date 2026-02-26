import { useState, useCallback } from "react";
import { DEFAULT_PAGE_SIZE } from "@/config/constants";

/**
 * Hook for managing table pagination & search state.
 * Centralizes common logic across list pages.
 */
export function useTableParams(defaultPageSize = DEFAULT_PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [search, setSearch] = useState("");

  const onSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1); // reset page on new search
  }, []);

  const onPageChange = useCallback((newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  }, []);

  return {
    page,
    pageSize,
    search,
    setPage,
    setPageSize,
    onSearch,
    onPageChange,
    /** Params object ready for API call */
    params: {
      page,
      page_size: pageSize,
      search: search || undefined,
    },
  };
}
