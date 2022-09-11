import { Product, ProductLocation } from "shared/lib/types";
import { httpClient } from "./../http-client";

const getProducts = (params: any): Promise<Product[]> => {
  return httpClient.get("/product", params);
};

const getProduct = (id: string): Promise<Product> => {
  return httpClient.get(`/product/${id}`);
};

export type CreateProductBody = {
  author: string;
  title: string;
  category: string;
  location: ProductLocation;
  length: number;
  beam: number;
  built: number;
  description?: string;
  price: number;
  images: string[];
};

const dto = (body: CreateProductBody) => {
  return {...body, location: body.location._id}
}

const createProduct = (body: CreateProductBody): Promise<Product> => {
  return httpClient.post("/product", dto(body));
};

const editProduct = (id: string, body: CreateProductBody): Promise<Product> => {
  return httpClient.put(`/product/${id}`, dto(body));
};

export const productApi = {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
};
