import React, { useState } from "react";
import { PAGINATION } from "shared/lib/contants/index";

export const usePagination = () => {
  const [page, setPage] = useState(PAGINATION.PAGE);
  const [take, setTake] = useState(PAGINATION.TAKE);
  const [total, setTotal] = useState(0);

  const setMeta = React.useCallback((meta: Meta) => {
    setPage(meta.page);
    setTake(meta.take);
    setTotal(meta.itemCount);
  }, []);

  const totalPages = Math.ceil(total / take);

  return { page, take, setMeta, total, totalPages, setPage, setTake };
};
