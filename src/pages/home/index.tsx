import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductList } from "widgets";
import { useProductList } from "entities/product/hooks";
import { ProductFilter, ProductSort } from "entities/product/ui";
import { Product } from "shared/lib/types";
import { MainTemplate, Pagination } from "shared/ui";
import { paths } from "shared/lib/paths";
import { FilterOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.home_page}>
      <MainTemplate>
        <Products />
      </MainTemplate>
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();

  const {
    query,
    pagination,
    setFilters,
    setSort,
    setPage,
    setTake,
  } = useProductList();

  const handleProductClick = (product: Product) => {
    navigate(paths.product(product._id));
  };

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles["products"]}>
      <div
        className={
          isActive
            ? [
                styles["products__filter"],
                [styles["products__filter--active"]],
              ].join(" ")
            : styles["products__filter"]
        }
      >
        <div className={
          isActive
            ? [
                styles["filter__form"],
                [styles["filter__form--active"]],
              ].join(" ")
            : styles["filter__form"]
        }>
          <ProductFilter setFilters={setFilters} />
        </div>
        <div className={styles["filter__toggle"]}>
          <div
            className={styles["toggle__btn"]}
            onClick={() => setIsActive((v) => !v)}
          >
            <FilterOutlined />
          </div>
        </div>
      </div>
      <div className={styles["products__list"]}>
        <div>
          <ProductSort setSort={setSort} />
        </div>
        <ProductList
          products={query?.data?.data}
          onProductClick={handleProductClick}
        />
        <Pagination
          totalPages={pagination.totalPages}
          page={pagination.page}
          take={pagination.take}
          setPage={setPage}
          setTake={setTake}
        />
      </div>
    </div>
  );
};
