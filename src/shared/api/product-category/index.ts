import { httpClient } from "./../http-client";
// import { Product } from "entities/product/types";

const getTree = () => {
  return httpClient.get('product-category')
};

export const productCategoryApi = {
  getTree
};
