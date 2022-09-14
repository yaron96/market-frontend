import { useQuery } from "react-query";
import { usePagination } from "shared/lib/hooks/usePagination";
import { productApi } from "shared/api/product/index";
import { productKeys } from "shared/lib/query";
import { useUrlParams } from "./useUrlParams";

export const useProductList = () => {
  const {
    params: { isInit, value },
    setTake,
    setPage,
    sort,
    setSort,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setLocation,
    setMinBuilt,
    setMaxBuilt,
    setMinLength,
    setMaxLength,
    setMinBeam,
    setMaxBeam,
  } = useUrlParams();

  const pagination = usePagination();

  const query = useQuery(
    productKeys.list(value),
    () => productApi.getProducts(value),
    {
      enabled: isInit,
      onSuccess: (data: any) => {
        pagination.setMeta(data.meta);
      },
    }
  );

  return {
    isInit,
    query,
    pagination,
    setFilters: {
      setCategory,
      setMinPrice,
      setMaxPrice,
      setLocation,
      setMinBuilt,
      setMaxBuilt,
      setMinLength,
      setMaxLength,
      setMinBeam,
      setMaxBeam,
    },
    setTake,
    setPage,
    sort,
    setSort,
  };
};
