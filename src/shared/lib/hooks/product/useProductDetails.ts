import { useQuery } from 'react-query';
import { productApi } from 'shared/api/product/index';
import { productKeys } from 'shared/lib/query/keys';

export const useProductDetails = (id: string) => {
  const query = useQuery(
    productKeys.detail(id),
    () => productApi.getProduct(id)
  )

  return { query };
}