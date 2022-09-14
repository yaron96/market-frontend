import { useEffect, useMemo, useState } from "react";
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

interface Params {
  isInit: boolean;
  value: {
    [key: string]: any;
  };
}

export const useUrlParams = () => {
  const [paramsInURL, setParamsInURL] = useSearchParams();
  const [params, setParams] = useState<Params>({ isInit: false, value: {} });

  useEffect(() => {
    if (isIn()) {
      const paramsObj: {
        [key: string]: any;
      } = Object.fromEntries(paramsInURL);

      if (paramsObj[names.category]?.includes(",")) {
        paramsObj[names.category] = paramsObj[names.category].split(",");
      }
      setParams({ isInit: true, value: paramsObj });
    } else {
      initiate();
    }

    function isIn() {
      return (
        paramsInURL.has(names.page) &&
        paramsInURL.has(names.take) &&
        paramsInURL.has(names.sort)
      );
    }

    function initiate() {
      if (!paramsInURL.has(names.page)) {
        paramsInURL.set(names.page, PAGINATION.PAGE.toString());
      }
      if (!paramsInURL.has(names.take)) {
        paramsInURL.set(names.take, PAGINATION.TAKE.toString());
      }
      if (!paramsInURL.has(names.sort)) {
        paramsInURL.set(names.sort, SORT_BY.CREATED_DESC);
      }
      setParamsInURL(paramsInURL);
    }
  }, [paramsInURL]);

  const universal = (
    name: string,
    value: number | string | string[] | null | undefined
  ) => {
    if (
      (typeof value === "number" && value) ||
      (Array.isArray(value) && value.length) ||
      typeof value === "string"
    ) {
      paramsInURL.set(
        name,
        typeof value === "string" ? value : value.toString()
      );
      setParamsInURL(paramsInURL);
    } else {
      paramsInURL.delete(name);
      setParamsInURL(paramsInURL);
    }
  };

  const setPage = (value: number) => {
    paramsInURL.set(names.page, value.toString());
    setParamsInURL(paramsInURL);
  };

  const setTake = (value: number) => {
    paramsInURL.set(names.take, value.toString());
    setParamsInURL(paramsInURL);
  };

  const setSort = (value: string) => {
    paramsInURL.set(names.sort, value);
    setParamsInURL(paramsInURL);
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
    params,
    setTake,
    setPage,
    sort: paramsInURL.get("sort"),
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
