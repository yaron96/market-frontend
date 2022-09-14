import React from "react";
import { SearchSelectCity } from "widgets";
import { ProductLocation } from "shared/lib/types";
import { NumberRange } from "shared/ui/numberRange";
import { CategoryFilter } from "./category";
import styles from "./styles.module.scss";

interface Props {
  filters: {
    category: string[] | undefined;
  }
  setFilters: {
    setCategory: (arg: string[]) => void;
    setMinPrice: (arg: number | null | undefined) => void;
    setMaxPrice: (arg: number | null | undefined) => void;
    setLocation: (arg: ProductLocation | undefined) => void;
    setMinBuilt: (arg: number | null | undefined) => void;
    setMaxBuilt: (arg: number | null | undefined) => void;
    setMinLength: (arg: number | null | undefined) => void;
    setMaxLength: (arg: number | null | undefined) => void;
    setMinBeam: (arg: number | null | undefined) => void;
    setMaxBeam: (arg: number | null | undefined) => void;
  };
}

export const ProductFilter: React.FC<Props> = ({
  filters: {
    category
  },
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
}) => {
  return (
    <div className={styles["product-filter"]}>
      <div className={styles["product-filter__prop"]}>
        <h1>Category</h1>
        <CategoryFilter category={category} setCategory={setCategory} />
      </div>
      <div className={styles["product-filter__prop"]}>
        <h1>Price</h1>
        <NumberRange
          placeHolders={{
            minimum: "Min. price, $",
            maximum: "Max. price, $",
          }}
          onChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
      </div>
      <div className={styles["product-filter__prop"]}>
        <h1>Location</h1>
        <SearchSelectCity onChange={setLocation} />
      </div>
      <div className={styles["product-filter__prop"]}>
      <h1>Built</h1>
        <NumberRange
          placeHolders={{
            minimum: "Min. built, year",
            maximum: "Max. built, year",
          }}
          onChange={(min, max) => {
            setMinBuilt(min);
            setMaxBuilt(max);
          }}
        />
      </div>
      <div className={styles["product-filter__prop"]}>
      <h1>Length</h1>
        <NumberRange
          placeHolders={{
            minimum: "Min. length, m",
            maximum: "Max. length, m",
          }}
          onChange={(min, max) => {
            setMinLength(min);
            setMaxLength(max);
          }}
        />
      </div>
      <div className={styles["product-filter__prop"]}>
      <h1>Beam</h1>
        <NumberRange
          placeHolders={{
            minimum: "Min. beam, m",
            maximum: "Max. beam, m",
          }}
          onChange={(min, max) => {
            setMinBeam(min);
            setMaxBeam(max);
          }}
        />
      </div>
    </div>
  );
};
