import { ReactElement } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactElement;
  visible: boolean;
  setVisible: (b: boolean) => void;
}

export const Modal: React.FC<Props> = ({ children, visible, setVisible }) => {
  const onClose = () => {
    console.log("a");
    setVisible(false);
  };

  return (
    <div
      className={
        visible ? [styles.modal, styles.active].join(" ") : styles.modal
      }
    >
      <div className={styles.modal_content}>{children}</div>
      <span className={styles.close} onClick={onClose}>
        &times;
      </span>
    </div>
  );
};
