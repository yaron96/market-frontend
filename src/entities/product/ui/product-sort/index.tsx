import { SORT_BY } from "shared/lib/contants";
import styles from "./styles.module.scss";

interface Props {
  sort: string | null;
  setSort: any;
}

export const ProductSort: React.FC<Props> = ({ sort, setSort }) => {
  const isSelected = (asc: string, desc: string) => {
    return sort === asc || sort === desc;
  };

  const isAscending = (asc: string) => {
    return sort === asc;
  };

  return (
    <div className={styles.sort}>
      <button
        className={
          isSelected(SORT_BY.PRICE_ASC, SORT_BY.PRICE_DESC)
            ? [styles["button"], styles["button--active"]].join(" ")
            : styles["button"]
        }
        onClick={() =>
          setSort(
            isAscending(SORT_BY.PRICE_ASC)
              ? SORT_BY.PRICE_DESC
              : SORT_BY.PRICE_ASC
          )
        }
      >
        {`${isAscending(SORT_BY.PRICE_ASC) ? "↑" : "↓"} Price`}
      </button>
      <button
        className={
          isSelected(SORT_BY.CREATED_ASC, SORT_BY.CREATED_DESC)
            ? [styles["button"], styles["button--active"]].join(" ")
            : styles["button"]
        }
        onClick={() =>
          setSort(
            isAscending(SORT_BY.CREATED_ASC)
              ? SORT_BY.CREATED_DESC
              : SORT_BY.CREATED_ASC
          )
        }
      >
        {`${isAscending(SORT_BY.CREATED_ASC) ? "↑" : "↓"} Created`}
      </button>
      <button
        className={
          isSelected(SORT_BY.UPDATED_ASC, SORT_BY.UPDATED_DESC)
            ? [styles["button"], styles["button--active"]].join(" ")
            : styles["button"]
        }
        onClick={() =>
          setSort(
            isAscending(SORT_BY.UPDATED_ASC)
              ? SORT_BY.UPDATED_DESC
              : SORT_BY.UPDATED_ASC
          )
        }
      >
        {`${isAscending(SORT_BY.UPDATED_ASC) ? "↑" : "↓"} Updated`}
      </button>
    </div>
  );
};
