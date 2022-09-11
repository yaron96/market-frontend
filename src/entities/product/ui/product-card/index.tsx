import { API_URL } from "shared/lib/config";
import { Product } from "shared/lib/types";
import styles from "./styles.module.scss";

interface Props {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

  return (
    <div className={styles["product-card"]} onClick={handleClick}>
      <div className={styles["product-card__image"]}>
        {product.images.length ? (
          <img src={`${API_URL}/image/thumb/${product.images[0]}`} />
        ) : (
          <div className={styles["no-image"]}>
            <h1>no image</h1>
          </div>
        )}
      </div>
      <div className={styles["product-card__text-content"]}>
        <div className={styles["text-content__main"]}>
          <h1>{product.title}</h1>
          <h3 className={styles["price"]}>{numberWithSpaces(product.price)} $</h3>
          <h2>{`${product.location.title}, ${product.location.country.title}`}</h2>
          <p>
            {product.length} m. x {product.beam} m.
          </p>
          <p>{product.built}</p>
        </div>
        <div className={styles["text-content__description"]}>
          {product.description.length <= 300
            ? product.description
            : `${product.description.slice(0, 300)}...`}
        </div>
      </div>
    </div>
  );
};
