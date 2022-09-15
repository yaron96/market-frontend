import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "shared/lib/hooks/useDebounce";
import { paths } from "shared/lib/paths";
import { URL_PARAMS } from "shared/lib/contants";
import styles from "../styles.module.scss";

export const useHeaderSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [urlParams, setUrlParams] = useSearchParams();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchTerm = useDebounce(searchValue, 1000);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isInitiated, setIsInitiated] = useState(false);

  useEffect(() => {
    if (debounceSearchTerm) {
      if (location.pathname !== paths.home()) {
        return navigate(`${paths.home()}?${URL_PARAMS.search}=${debounceSearchTerm}`);
      } else {
        urlParams.set(URL_PARAMS.search, debounceSearchTerm);
        setUrlParams(urlParams);
      }
    } else {
      if (urlParams.has(URL_PARAMS.search)) {
        if (isInitiated) {
          urlParams.delete(URL_PARAMS.search);
          setUrlParams(urlParams);
        } else {
          setIsInitiated(true);
          setSearchValue(`${urlParams.get(URL_PARAMS.search)}`);
        }
      }
    }
  }, [debounceSearchTerm]);

  useEffect(() => {
    if (isSearchActive) {
      inputRef.current?.focus();
    }
  }, [isSearchActive]);

  const headerSearchClassName = useMemo(() => {
    return isSearchActive
      ? [styles["header__search"], styles["header__search_active"]].join(" ")
      : styles["header__search"];
  }, [isSearchActive]);

  return {
    searchValue,
    setSearchValue,
    setIsSearchActive,
    inputRef,
    headerSearchClassName,
  };
};
