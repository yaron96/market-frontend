import { useMutation } from "react-query";
import { imageApi } from "shared/api/image";

export const useUploadImage = () => {
  const mutation = useMutation(imageApi.uploadImages, {
    onSuccess: (id) => {
      console.log(id);
    },
  });

  return { mutation };
};
