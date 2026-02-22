import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../api/categoriesApi";
import { fetchProductsByCategory } from "../api/productsApi";
import type { Product } from "../types";

function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProductsByCategory(categoryId!),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const category = categories.find((category) => category.id === categoryId);

  if (isLoading) return <p className="text-center">Загрузка...</p>;

  if (!category) {
    return <p>Категория не найдена</p>;
  }

  return (
    <>
      <h1>{category.title}</h1>
      <ul className="flex flex-wrap gap-30 justify-center">
        {products.map((product) => (
          <li key={product.id}>
            <div className="w-100 bg-purple-100 p-5">
              <p className="text-xl">Имя: {product.name}</p>
              <p className="text-l">Возраст: {product.age}</p>
              <p className="text-l">Порода: {product.breed}</p>
              <img src={product.image} alt={product.name} />
              <p className="text-l">{product.description}</p>
              <p className="text-xl">Цена: {product.price}p</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Category;
