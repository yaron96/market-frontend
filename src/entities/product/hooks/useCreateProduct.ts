import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useProductForm } from "shared/lib/hooks/product";
import { productApi } from "shared/api/product";
import { productKeys } from "shared/lib/query/keys";
import { Product } from "shared/lib/types";

interface Params {
  onSuccess: (post: Product) => void;
}

export const useCreateProduct = ({ onSuccess }: Params) => {
  const [isInit, setIsInit] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation(productApi.createProduct, {
    onSuccess: (post) => {
      onSuccess(post);
      queryClient.removeQueries(productKeys.lists());
    },
  });

  const form = useProductForm();
  if (!isInit) {
    setIsInit(true);
    form.setValue('images', []);
  }

  const handleSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return { handleSubmit, form };
};
