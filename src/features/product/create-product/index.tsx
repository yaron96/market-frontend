import { useCreateProduct } from "entities/product/hooks/useCreateProduct";
import { ProductPropsForm } from "entities/product/ui"
import { Product } from "shared/lib/types";


interface Props {
  onProductCreated: (post: Product) => void;
  onCancelClicked: () => void;
}

export const CreateProductForm: React.FC<Props> = ({
  onProductCreated,
  onCancelClicked,
}) => {
  const { form, handleSubmit } = useCreateProduct({
    onSuccess: onProductCreated,
  });

  return <ProductPropsForm form={form} handleSubmit={handleSubmit} />;
};
