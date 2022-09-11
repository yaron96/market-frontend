import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalImageGallery } from "widgets";
import { paths } from "shared/lib/paths";
import { Product } from "shared/lib/types";
import { UserActions } from "./UserActions";
import { API_URL } from "shared/lib/config";
import styles from "./styles.module.scss";

interface Props {
  product: Product;
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const [selectedImg, setSelectedImg] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImg(product.images[0]);
    }
  }, [product]);

  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <div className={styles["product-details"]}>
      <ModalImageGallery
        currentSrc={selectedImg}
        srcs={product.images}
        setVisible={setIsModalVisible}
        visible={isModalVisible}
      />
      <div className={styles["product-details__wrap"]}>
        <div className={styles["product-details__gallery"]}>
          <div className={styles.gallery}>
            <div className={styles.gallery__selected}>
              {selectedImg.length && (
                <img
                  src={`${API_URL}/image/${selectedImg}`}
                  onClick={() => setIsModalVisible(true)}
                />
              )}
            </div>
            <div className={styles.gallery__slider}>
              {product.images.map((id) => (
                <div className={styles.slider_item} key={id}>
                  <img
                    src={`${API_URL}/image/thumb/${id}`}
                    onClick={() => setSelectedImg(id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles["product-details__about"]}>
          <h2>{`Details about ${product.title}`}</h2>
          <div className={styles.about}>
            <div className={[styles.tr, styles.price].join(" ")}>
              <p className={styles.td}>Price: </p>
              <a className={styles.td}>{numberWithSpaces(product.price)} $</a>
            </div>
            <div className={[styles.tr].join(" ")}>
              <p className={styles.td}>Built: </p>
              <a className={styles.td}>{product.built}</a>
            </div>
            <div className={[styles.tr].join(" ")}>
              <p className={styles.td}>Category: </p>
              <a className={styles.td}>{product.category.title}</a>
            </div>
            <div className={[styles.tr].join(" ")}>
              <p className={styles.td}>Location: </p>
              <a className={styles.td}>
                {`${product.location.title}, ${product.location.country.title}`}
              </a>
            </div>
            <h2 className={[styles.prop, styles.tech].join(" ")}>
              Tech specs:
            </h2>
            <div className={[styles.tr].join(" ")}>
              <p className={styles.td}>Length: </p>
              <a className={styles.td}>{product.length}</a>
            </div>
            <div className={[styles.tr].join(" ")}>
              <p className={styles.td}>Beam: </p>
              <a className={styles.td}>{product.beam}</a>
            </div>
            <div className={[styles.tr, styles.author].join(" ")}>
              <p className={styles.td}>Author: </p>
              <Link to={paths.home()}>
                <div className={styles.tr}>{product.author.nickname}</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={[styles.tr].join(" ")}>
          <p className={styles.td}>{product.description}</p>
        </div>
      </div>
      <div>
            <UserActions
              productId={product._id}
              authorId={product.author._id}
            />
          </div>
    </div>
  );
};
