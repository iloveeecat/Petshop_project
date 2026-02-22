import axios from "axios";
import type { Category } from "../types";

const api = axios.create({
  baseURL: "https://68e3c74e8e14f4523daea3ad.mockapi.io",
});

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get("/categories");
  return data;
};

export const createCategory = async (category: Omit<Category, "id">) => {
  const { data } = await api.post("/categories", category);
  return data;
};

export const updateCategory = async (id: string, category: Omit<Category, "id">) => {
  const { data } = await api.put(`/categories/${id}`, category);
  return data;
};

export const deleteCategory = async (id: string) => {
  await api.delete(`/categories/${id}`);
};