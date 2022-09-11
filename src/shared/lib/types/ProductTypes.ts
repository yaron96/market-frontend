import { User } from "./UserTypes";

export interface Product {
  _id: string;
  title: string;
  author: User;
  category: ProductCategory;
  location: ProductLocation;
  price: number;
  description: string;
  length: number;
  beam: number;
  built: number;
  images: string[];
}

export interface ProductCategory {
  _id: string,
  title: string,
}

export interface ProductLocation {
  _id: string,
  title: string,
  country: {
    _id: string,
    title: string,
  }
}