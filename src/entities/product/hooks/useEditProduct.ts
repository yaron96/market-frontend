import { useState } from 'react';
import { useMutation, useQueryClient } from "react-query"
import { useProductDetails, useProductForm } from 'shared/lib/hooks/product';
import { productApi, CreateProductBody } from 'shared/api/product';
import { productKeys } from 'shared/lib/query/keys';
import { Product } from 'shared/lib/types';

interface Params {
  productId: string;
  onSuccess: (post: Product) => void;
}

interface Params2 {
  id: string;
  body: CreateProductBody;
}

export const useEditProduct = ({ onSuccess, productId }: Params) => {
  const [isInit, setIsInit] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({id, body}: Params2) => productApi.editProduct(id, body),
    {
      onSuccess: (post) => {
        onSuccess(post);
        queryClient.removeQueries(productKeys.lists());
      },
    }
  )

  const form = useProductForm();

  const { query } = useProductDetails(productId)
  if (!isInit && query.isSuccess) {
    setIsInit(true);
    form.setValue('title', query.data.title)
    form.setValue('category', query.data.category._id)
    form.setValue('location', query.data.location)
    form.setValue('length', query.data.length)
    form.setValue('beam', query.data.beam)
    form.setValue('built', query.data.built)
    form.setValue('description', query.data.description)
    form.setValue('price', query.data.price)
    form.setValue('images', query.data.images)
  }

  const handleSubmit = form.handleSubmit((body: CreateProductBody) => {
    console.log('234')
    console.log(body)
    mutation.mutate({id: productId, body});
  });
  
  return { handleSubmit, form };
}