import { useEditProduct } from "entities/product/hooks";
import { ProductPropsForm } from "entities/product/ui";
import { Product } from "shared/lib/types";


interface Props {
  productId: string;
  onProductEdited: (post: Product) => void;
  onCancelClicked: () => void;
}

export const EditProductForm: React.FC<Props> = ({
  productId,
  onProductEdited,
  onCancelClicked,
}) => {
  const { form, handleSubmit } = useEditProduct({
    productId,
    onSuccess: onProductEdited,
  });

  return <ProductPropsForm form={form} handleSubmit={handleSubmit} />;
};
