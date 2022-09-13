import { Navigate, useRoutes } from "react-router";
import { paths } from "shared/lib/paths";
import { HomePage } from "./home";
import { AuthPage } from "./auth";
import { authRoutes } from "./auth/routes";
import { CreateProduct } from "./product-create";
import { ProductPage } from "./product-details";
import { EditProduct } from "./product-edit";

export const Routes = () => {
  const element = useRoutes([
    { path: paths.empty(),
      element: <Navigate to={paths.home()} />
    },
    {
      path: paths.home(),
      element: <HomePage />,
    },
    {
      path: paths.auth(),
      element: <AuthPage />,
      children: authRoutes(),
    },
    {
      path: paths.createProduct(),
      element: <CreateProduct />,
    },
    {
      path: paths.editProduct(":id"),
      element: <EditProduct />,
    },
    {
      path: paths.product(":id"),
      element: <ProductPage />,
    },
  ]);

  return element;
};
