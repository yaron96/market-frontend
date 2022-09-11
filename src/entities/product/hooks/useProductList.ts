import { useState } from "react";
import { useQuery } from "react-query";
import { usePagination } from "shared/lib/hooks/usePagination";
import { productApi } from "shared/api/product/index";
import { productKeys } from "shared/lib/query";
import { SORT_BY } from "shared/lib/contants/index";
import { ProductLocation } from "shared/lib/types";

export interface Filters {
  category?: Array<string>;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  minBuilt?: number;
  maxBuilt?: number;
  minLength?: number;
  maxLength?: number;
  minBeam?: number;
  maxBeam?: number;
}

export const useProductList = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState(SORT_BY.CREATED_DESC);

  const pagination = usePagination();

  const params = {
    take: pagination.take,
    page: pagination.page,
    ...filters,
    sort,
  };

  const query = useQuery(
    productKeys.list(params),
    () => productApi.getProducts(params),
    {
      onSuccess: (data: any) => {
        pagination.setMeta(data.meta);
      },
    }
  );

  const setCategory = (category: string[]) => {
    if (category.length) {
      setFilters((filters) => ({
        ...filters,
        category,
      }));
    } else {
      setFilters((filters) => {
        delete filters.category;
        return { ...filters };
      });
    }
  };

  const setMinPrice = (minPrice: number | null | undefined) => {
    if (minPrice) {
      setFilters((filters) => ({
        ...filters,
        minPrice,
      }));
    } else {
      setFilters((filters) => {
        delete filters.minPrice;
        return { ...filters };
      });
    }
  };

  const setMaxPrice = (maxPrice: number | null | undefined) => {
    if (maxPrice) {
      setFilters((filters) => ({
        ...filters,
        maxPrice,
      }));
    } else {
      setFilters((filters) => {
        delete filters.maxPrice;
        return { ...filters };
      });
    }
  };

  const setLocation = (location: ProductLocation | undefined) => {
    if (location) {
      setFilters((filters) => ({
        ...filters,
        location: location._id,
      }));
    } else {
      setFilters((filters) => {
        delete filters.location;
        return { ...filters };
      });
    }
  };

  const setMinBuilt = (minBuilt: number | null | undefined) => {
    if (minBuilt) {
      setFilters((filters) => ({
        ...filters,
        minBuilt,
      }));
    } else {
      setFilters((filters) => {
        delete filters.minBuilt;
        return { ...filters };
      });
    }
  };

  const setMaxBuilt = (maxBuilt: number | null | undefined) => {
    if (maxBuilt) {
      setFilters((filters) => ({
        ...filters,
        maxBuilt,
      }));
    } else {
      setFilters((filters) => {
        delete filters.maxBuilt;
        return { ...filters };
      });
    }
  };

  const setMinLength = (minLength: number | null | undefined) => {
    if (minLength) {
      setFilters((filters) => ({
        ...filters,
        minLength,
      }));
    } else {
      setFilters((filters) => {
        delete filters.minLength;
        return { ...filters };
      });
    }
  };

  const setMaxLength = (maxLength: number | null | undefined) => {
    if (maxLength) {
      setFilters((filters) => ({
        ...filters,
        maxLength,
      }));
    } else {
      setFilters((filters) => {
        delete filters.maxLength;
        return { ...filters };
      });
    }
  };

  const setMinBeam = (minBeam: number | null | undefined) => {
    if (minBeam) {
      setFilters((filters) => ({
        ...filters,
        minBeam,
      }));
    } else {
      setFilters((filters) => {
        delete filters.minBeam;
        return { ...filters };
      });
    }
  };

  const setMaxBeam = (maxBeam: number | null | undefined) => {
    if (maxBeam) {
      setFilters((filters) => ({
        ...filters,
        maxBeam,
      }));
    } else {
      setFilters((filters) => {
        delete filters.maxBeam;
        return { ...filters };
      });
    }
  };

  return {
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
    setSort,
  };
};
