import { useNavigate } from "react-router";
import { CreateProductForm } from "features/product/create-product";
import { paths } from "shared/lib/paths";
import { MainTemplate } from "shared/ui";

export const CreateProduct = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MainTemplate>
        <CreateProductForm
          onCancelClicked={() => {}}
          onProductCreated={(product) => navigate(paths.product(product._id))}
        />
      </MainTemplate>
    </div>
  );
}