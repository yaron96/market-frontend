import { useEffect, useState } from "react";
import { useSearchCity } from "shared/lib/hooks/useSearchCity";
import { ProductLocation } from "shared/lib/types";
import { Select } from "antd";
import styles from "./styles.module.scss"

interface Props {
  value?: ProductLocation;
  onChange: (arg: ProductLocation | undefined) => void;
}

export const SearchSelectCity: React.FC<Props> = ({ onChange, value }) => {
  const [props, setProps] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const { setQuery, options } = useSearchCity();

  useEffect(() => {
    if (value) {
      setProps(() => ({ value: locationToString(value) }));
    }
  }, [value]);

  useEffect(() => {
    setQuery(searchValue);
    setProps(() => ({ searchValue }));
  }, [searchValue]);

  const handleChange = (_: string, opts: any) => {
    if (opts) {
      const found = options.find((e) => e._id === opts.key);
      setQuery("");

      if (found) {
        onChange(found);
        setProps(() => ({ value: locationToString(found) }));
      }
    } else {
      const value = undefined;
      onChange(value);
      setProps({value})
    }
  };

  return (
    <div className={styles["search-select-city"]}>
      <Select className={styles["search-select-city__select"]}
        allowClear
        placeholder="Start typing and select a location"
        showSearch={true}
        onSearch={setSearchValue}
        onChange={handleChange}
        {...props}
      >
        {options.map((el) => (
          <Select.Option
          value={el.title} key={el._id}>
            {locationToString(el)}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

function locationToString(location: ProductLocation) {
  return `${location.title}, ${location.country.title}`;
}
