import { EditProductForm } from "features/product/edit-product";
import { paths } from "shared/lib/paths";
import { useNavigate, useParams } from "react-router";
import { MainTemplate } from "shared/ui";

export const EditProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <MainTemplate>
        <EditProductForm
          productId={`${id}`}
          onCancelClicked={() => {}}
          onProductEdited={(product) => navigate(paths.product(product._id))}
        />
      </MainTemplate>
    </div>
  );
}