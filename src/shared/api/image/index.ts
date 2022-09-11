import { httpClient } from "shared/api/http-client";

const uploadImages = (images: File[]): Promise<string[]> => {
  const form = new FormData();
  images.map((file) => form.append("images", file))
  return httpClient.post(`/image`, form);
};

export const imageApi = {
  uploadImages,
};
