import React, { useEffect, useState } from "react";
import { ModalImageGallery } from "widgets";
import { useUploadImage } from "shared/lib/hooks/useUploadImage";
import { API_URL } from "shared/lib/config";
import styles from "./styles.module.scss";

interface Props {
  value: string[];
  onChange: (imgIds: Array<string>) => void;
}

export const ImageUploadForm: React.FC<Props> = ({ value, onChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const { mutation } = useUploadImage();

  const { dragEnd, dragEnter, dragStart, draggable, sorted } = useDraggable(
    value,
    onChange
  );

  const handleSelectFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files: File[] = [];
    Array.prototype.forEach.call(e.target.files, (file) => files.push(file));
    const uploaded = await mutation.mutateAsync(files);
    onChange([...value, ...uploaded]);
  };

  const handleRemove = async (id: string) => {
    onChange(value.filter((e) => e !== id));
  };

  return (
    <div className={styles["form"]}>
      <ModalImageGallery
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        currentSrc={currentImage}
        srcs={value}
      />
      <div className={styles["form__slider"]}>
          {sorted.map((id, index) => (
            <div
              className={
                id === draggable
                  ? [
                      styles["form__item"],
                      styles["form__item--draggable"],
                    ].join(" ")
                  : styles["form__item"]
              }
              key={id}
              onDragStart={() => dragStart(id)}
              onDragEnter={() => dragEnter(id)}
              onDragEnd={dragEnd}
            >
              <h2>{index === 0 ? "1 main" : index + 1}</h2>
              <a
                className={styles["close-icon"]}
                onClick={() => {
                  handleRemove(id);
                }}
              ></a>
              <img
                src={`${API_URL}/image/thumb/${id}`}
                onClick={() => {
                  setCurrentImage(id);
                  setIsModalVisible(true);
                }}
                onDrag={() => {
                  console.log("drag");
                }}
              />
            </div>
          ))}
          <label
            className={[styles["form__item"], styles["form__item--add"]].join(
              " "
            )}
          >
            <input
              style={{ display: "none" }}
              type="file"
              multiple
              onChange={handleSelectFiles}
            ></input>
            <div className={styles["add-icon"]}></div>
            <div className={styles["add-text"]}>Add image</div>
          </label>
        </div>
    </div>
  );
};

const useDraggable = (images: string[], onChange: (arg: string[]) => void) => {
  const [sorted, setSorted] = useState<Array<string>>([]);
  const [draggable, setDraggable] = useState<string>("");
  const [beforeSortLinkArr, setBeforeSortLinks] = useState<Array<string>>([]);

  useEffect(() => {
    if (images) {
      setSorted(images);
    }
  }, [images]);

  function dragStart(link: string) {
    setBeforeSortLinks(sorted);
    setDraggable(link);
  }

  function dragEnter(targetLink: string) {
    if (targetLink !== draggable) sort(draggable, targetLink);
  }

  function dragEnd() {
    setDraggable("");
    if (isSorted()) {
      console.log("sorted");
      onChange(sorted);
    }
  }

  function sort(draggableLink: string, targetLink: string) {
    const tempArr = [...sorted];
    const draggableIndex = findIndexByLink(draggableLink);
    const targetIndex = findIndexByLink(targetLink);
    const draggable = tempArr.splice(draggableIndex, 1).pop();
    draggable && tempArr.splice(targetIndex, 0, draggable);
    setSorted(tempArr);
    console.log("sort func");
  }

  const findIndexByLink = (link: string) => sorted.findIndex((i) => i === link);

  const isSorted = () =>
    !sorted.every((value, index) => value === beforeSortLinkArr[index]);

  return {
    sorted,
    dragStart,
    dragEnter,
    dragEnd,
    draggable,
  };
};
