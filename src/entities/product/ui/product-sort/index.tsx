import { useEffect, useState } from "react";
import { SORT_BY } from "shared/lib/contants";
import styles from "./styles.module.scss";

interface Props {
  setSort: any;
}

export const ProductSort: React.FC<Props> = ({ setSort }) => {
  const { value, setValue, sortBy } = useSort(setSort);

  const isSelected = (asc: string, desc: string) => {
    return value === asc || value === desc;
  };

  const isAscending = (asc: string) => {
    return value === asc;
  };

  return (
    <div className={styles.sort}>
      <button
        className={
          isSelected(sortBy.PRICE_ASC, sortBy.PRICE_DESC)
            ? [styles["button"], styles["button--active"]].join(" ")
            : styles["button"]
        }
        onClick={() =>
          setValue(
            isAscending(sortBy.PRICE_ASC)
              ? sortBy.PRICE_DESC
              : sortBy.PRICE_ASC
          )
        }
      >
        {`${isAscending(sortBy.PRICE_ASC) ? "↑" : "↓"} Price`}
      </button>
      <button
        className={
          isSelected(sortBy.CREATED_ASC, sortBy.CREATED_DESC)
            ? [styles["button"], styles["button--active"]].join(" ")
            : styles["button"]
        }
        onClick={() =>
          setValue(
            isAscending(sortBy.CREATED_ASC)
              ? sortBy.CREATED_DESC
              : sortBy.CREATED_ASC
          )
        }
      >
        {`${isAscending(sortBy.CREATED_ASC) ? "↑" : "↓"} Created`}
      </button>
      <button
        className={
          isSelected(sortBy.UPDATED_ASC, sortBy.UPDATED_DESC)
            ? [styles["button"], styles["button--active"]].join(" ")
            : styles["button"]
        }
        onClick={() =>
          setValue(
            isAscending(sortBy.UPDATED_ASC)
              ? sortBy.UPDATED_DESC
              : sortBy.UPDATED_ASC
          )
        }
      >
        {`${isAscending(sortBy.UPDATED_ASC) ? "↑" : "↓"} Updated`}
      </button>
    </div>
  );
};

const useSort = (setSort: any) => {
  const [value, setValue] = useState(SORT_BY.CREATED_DESC);

  useEffect(() => {
    setSort(value);
  }, [value]);

  return {
    value,
    setValue,
    sortBy: SORT_BY,
  };
};
