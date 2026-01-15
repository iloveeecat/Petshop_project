import axios from "axios";
import type { Product } from "../types";

const api = axios.create({
  baseURL: "https://68e3c74e8e14f4523daea3ad.mockapi.io",
});

// Получаем продукты по categoryId
export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const { data } = await api.get(`/products?categoryId=${categoryId}`);
  return data;
};

export const createProduct = async (product: Omit<Product, "id">) => {
  const { data } = await api.post("/products", product);
  return data;
};

export const updateProduct = async (id: string, product: Product) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
