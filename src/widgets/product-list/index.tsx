import { ProductCard } from "entities/product/ui";
import { Product } from "shared/lib/types";
import styles from "./styles.module.scss";

interface Props {
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

export const ProductList: React.FC<Props> = ({
  products,
  onProductClick = () => {},
}) => {

  return (
    <div className={styles.product_list}>
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};
