import { useEffect, useState } from "react";
import { API_URL } from "shared/lib/config";
import { Modal } from "shared/ui";
import styles from "./styles.module.scss";

interface Props {
  visible: boolean;
  setVisible: (b: boolean) => void;
  currentSrc: string;
  srcs: string[];
}

export const ModalImageGallery: React.FC<Props> = ({
  visible,
  setVisible,
  currentSrc,
  srcs,
}) => {
  const [curr, setCurr] = useState("");

  useEffect(() => setCurr(currentSrc), [currentSrc]);

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className={styles.modal_image_gallery}>
        <div className={styles.view}>
          {curr.length && <img src={`${API_URL}/image/${curr}`} />}
        </div>
        <div className={styles.slider}>
          {srcs &&
            srcs.map((id) => (
              <div key={id}>
                <img
                  src={`${API_URL}/image/thumb/${id}`}
                  onClick={() => setCurr(id)}
                />
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};
