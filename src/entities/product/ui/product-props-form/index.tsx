import { useCategoryTree } from "entities/product-category/hooks/useCategoryTree";
import { SearchSelectCity } from "widgets";
import { ImageUploadForm } from "features/product/edit-images";
import { ProductLocation } from "shared/lib/types";
import { Button, TextArea, TreeSelect, WithHelperText } from "shared/ui";
import styles from "./styles.module.scss";

interface Props {
  form: any;
  handleSubmit: () => void;
}

export const ProductPropsForm: React.FC<Props> = ({ form, handleSubmit }) => {
  const {
    formState: { errors },
    register,
    setValue,
  } = form;

  const { data: treeData } = useCategoryTree();

  const options = { shouldValidate: true };
  const setCategory = (id: any) => setValue("category", id, options);

  const setLocation = (location: ProductLocation | undefined) =>
    setValue("location", location, options);

  const setImages = (imgIds: string[]) => setValue("images", imgIds, options);

  return (
    <form className={styles["product-form"]} onSubmit={handleSubmit}>
      <div className={styles.form__group}>
        <input
          className={styles.form__input}
          placeholder=" "
          {...register("title")}
        />
        <label className={styles.form__label}>
          {errors.title?.message || "Title"}
        </label>
      </div>
      <WithHelperText helpertext={errors.category?.message}>
        <TreeSelect
          value={form.watch("category")}
          treeDefaultExpandAll
          placeholder="Category"
          treeData={treeData}
          fieldNames={{
            value: "_id",
          }}
          onChange={setCategory}
        />
      </WithHelperText>
      <WithHelperText helpertext={errors.location?.message}>
        <SearchSelectCity
          value={form.watch("location")}
          onChange={setLocation}
        />
      </WithHelperText>
      <div className={styles.length_beam}>
        <div className={styles.form__group}>
          <input
            className={styles.form__input}
            type="number"
            step="any"
            placeholder=" "
            {...register("length")}
          />
          <label className={styles.form__label}>
            {errors.length?.message || "Length, m"}
          </label>
        </div>
        <div className={styles.form__group}>
          <input
            className={styles.form__input}
            type="number"
            step="any"
            placeholder=" "
            {...register("beam")}
          />
          <label className={styles.form__label}>
            {errors.beam?.message || "Beam, m"}
          </label>
        </div>
      </div>
      <div className={styles.form__group}>
        <input
          className={styles.form__input}
          type="number"
          placeholder=" "
          {...register("built")}
        />
        <label className={styles.form__label}>
          {errors.built?.message || "Built, year"}
        </label>
      </div>
      <div className={styles.description}>
        <WithHelperText helpertext={errors.description?.message}>
          <TextArea
            rows={10}
            placeholder="Description"
            {...register("description")}
          />
        </WithHelperText>
      </div>
      <div className={styles.form__group}>
        <input
          className={styles.form__input}
          type="number"
          placeholder=" "
          {...register("price")}
        />
        <label className={styles.form__label}>
          {errors.price?.message || "Price, $"}
        </label>
      </div>
      <WithHelperText helpertext={errors.images?.message}>
        <ImageUploadForm value={form.watch("images")} onChange={setImages} />
      </WithHelperText>
      <Button type="submit">Save</Button>
    </form>
  );
};
