import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SORT_BY, PAGINATION } from "shared/lib/contants";
import { ProductLocation } from "shared/lib/types";
import { URL_PARAMS} from "shared/lib/contants";

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

      if (paramsObj[URL_PARAMS.category]?.includes(",")) {
        paramsObj[URL_PARAMS.category] = paramsObj[URL_PARAMS.category].split(",");
      }
      setParams({ isInit: true, value: paramsObj });
    } else {
      initiate();
    }

    function isIn() {
      return (
        paramsInURL.has(URL_PARAMS.page) &&
        paramsInURL.has(URL_PARAMS.take) &&
        paramsInURL.has(URL_PARAMS.sort)
      );
    }

    function initiate() {
      if (!paramsInURL.has(URL_PARAMS.page)) {
        paramsInURL.set(URL_PARAMS.page, PAGINATION.PAGE.toString());
      }
      if (!paramsInURL.has(URL_PARAMS.take)) {
        paramsInURL.set(URL_PARAMS.take, PAGINATION.TAKE.toString());
      }
      if (!paramsInURL.has(URL_PARAMS.sort)) {
        paramsInURL.set(URL_PARAMS.sort, SORT_BY.CREATED_DESC);
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
    paramsInURL.set(URL_PARAMS.page, value.toString());
    setParamsInURL(paramsInURL);
  };

  const setTake = (value: number) => {
    paramsInURL.set(URL_PARAMS.take, value.toString());
    setParamsInURL(paramsInURL);
  };

  const setSort = (value: string) => {
    paramsInURL.set(URL_PARAMS.sort, value);
    setParamsInURL(paramsInURL);
  };

  const category = useMemo(() => {
    const asString = paramsInURL.get(URL_PARAMS.category);
    if (asString) {
      if (asString.includes(",")) {
        return asString?.split(",");
      } else {
        return [asString];
      }
    }
  }, [paramsInURL.get(URL_PARAMS.category)]);

  const setCategory = (category: string[]) =>
    universal(URL_PARAMS.category, category);

  const setMinPrice = (minPrice: number | null | undefined) =>
    universal(URL_PARAMS.minPrice, minPrice);

  const setMaxPrice = (maxPrice: number | null | undefined) =>
    universal(URL_PARAMS.maxPrice, maxPrice);

  const setLocation = (location: ProductLocation | undefined) => {
    location
      ? universal(URL_PARAMS.location, location._id)
      : universal(URL_PARAMS.location, null);
  };

  const setMinBuilt = (minBuilt: number | null | undefined) =>
    universal(URL_PARAMS.minBuilt, minBuilt);

  const setMaxBuilt = (maxBuilt: number | null | undefined) =>
    universal(URL_PARAMS.maxBuilt, maxBuilt);

  const setMinLength = (minLength: number | null | undefined) =>
    universal(URL_PARAMS.minLength, minLength);

  const setMaxLength = (maxLength: number | null | undefined) =>
    universal(URL_PARAMS.maxLength, maxLength);

  const setMinBeam = (minBeam: number | null | undefined) =>
    universal(URL_PARAMS.minBeam, minBeam);

  const setMaxBeam = (maxBeam: number | null | undefined) =>
    universal(URL_PARAMS.maxBeam, maxBeam);

  return {
    params,
    setTake,
    setPage,
    sort: paramsInURL.get(URL_PARAMS.sort),
    setSort,
    category,
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
