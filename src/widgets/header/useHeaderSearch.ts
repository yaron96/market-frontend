import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "shared/lib/hooks/useDebounce";
import { paths } from "shared/lib/paths";
import styles from "./styles.module.scss";

export const useHeaderSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [urlParams, setUrlParams] = useSearchParams();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debounceSearchTerm = useDebounce(searchValue, 1000);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debounceSearchTerm) {
      if (location.pathname !== paths.home()) {
        return navigate(`${paths.home()}?search=${debounceSearchTerm}`);
      } else {
        urlParams.set("search", debounceSearchTerm);
        setUrlParams(urlParams);
      }
    } else {
      if (urlParams.has("search")) {
        urlParams.delete("search");
        setUrlParams(urlParams);
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
