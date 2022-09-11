import { Navigate, useParams } from "react-router";
import { ProductDetails } from "entities/product/ui";
import { useProductDetails } from "shared/lib/hooks/product";
import { paths } from "shared/lib/paths";
import { MainTemplate } from "shared/ui";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const { query } = useProductDetails(String(id));

  if (query.isLoading) {
    return (
      <MainTemplate>
        <h1>loading...</h1>
      </MainTemplate>
    );
  }

  if (query.error) {
    return <Navigate to={paths.home()} />;
  }

  const product = query.data!;

  return (
    <MainTemplate title={`Details about ${product.title}`}>
      <ProductDetails product={product} />
    </MainTemplate>
  )
}