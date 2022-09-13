import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SORT_BY, PAGINATION } from "shared/lib/contants";
import { ProductLocation } from "shared/lib/types";

enum names {
  take = "take",
  page = "page",
  sort = "sort",
  category = "category",
  minPrice = "minPrice",
  maxPrice = "maxPrice",
  location = "location",
  minBuilt = "minBuilt",
  maxBuilt = "maxBuilt",
  minLength = "minLength",
  maxLength = "maxLength",
  minBeam = "minBeam",
  maxBeam = "maxBeam",
}

export const useUrlParams = () => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (!params.has(names.page) || !params.has(names.take)) {
      if (!params.has(names.page)) {
        params.set(names.page, PAGINATION.PAGE.toString());
      }
      if (!params.has(names.take)) {
        params.set(names.take, PAGINATION.TAKE.toString());
      }
      if (!params.has(names.sort)) {
        params.set(names.sort, SORT_BY.CREATED_DESC);
      }
      setParams(params);
    }
  }, [params]);

  const paramsAsObject = useMemo(() => {
    const asObj: {
      [key: string]: any;
    } = Object.fromEntries(params);

    if (asObj[names.category]?.includes(",")) {
      asObj[names.category] = asObj[names.category].split(",");
    }

    return asObj;
  }, [params]);

  const universal = (
    name: string,
    value: number | string | string[] | null | undefined
  ) => {
    if (
      (typeof value === "number" && value) ||
      (Array.isArray(value) && value.length) ||
      typeof value === "string"
    ) {
      params.set(name, typeof value === "string" ? value : value.toString());
      setParams(params);
    } else {
      params.delete(name);
      setParams(params);
    }
  };

  const setPage = (value: number) => {
    params.set(names.page, value.toString());
    setParams(params);
  };

  const setTake = (value: number) => {
    params.set(names.take, value.toString());
    setParams(params);
  };

  const setSort = (value: string) => {
    params.set(names.sort, value);
    setParams(params);
  };

  const setCategory = (category: string[]) =>
    universal(names.category, category);

  const setMinPrice = (minPrice: number | null | undefined) =>
    universal(names.minPrice, minPrice);

  const setMaxPrice = (maxPrice: number | null | undefined) =>
    universal(names.maxPrice, maxPrice);

  const setLocation = (location: ProductLocation | undefined) => {
    location
      ? universal(names.location, location._id)
      : universal(names.location, null);
  };

  const setMinBuilt = (minBuilt: number | null | undefined) =>
    universal(names.minBuilt, minBuilt);

  const setMaxBuilt = (maxBuilt: number | null | undefined) =>
    universal(names.maxBuilt, maxBuilt);

  const setMinLength = (minLength: number | null | undefined) =>
    universal(names.minLength, minLength);

  const setMaxLength = (maxLength: number | null | undefined) =>
    universal(names.maxLength, maxLength);

  const setMinBeam = (minBeam: number | null | undefined) =>
    universal(names.minBeam, minBeam);

  const setMaxBeam = (maxBeam: number | null | undefined) =>
    universal(names.maxBeam, maxBeam);

  return {
    params: paramsAsObject,
    setTake,
    setPage,
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
  };
};
