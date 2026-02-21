import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../api/categoriesApi";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import AnimalsForm from "./AnimalsForm";
import AnimalsList from "./AnimalsList";

export default function AnimalsPage() {
  const { id } = useParams<{ id: string }>();
  const { error } = useAppSelector((state) => state.products);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const category = categories.find((category) => category.id === id);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Категория: {category?.title || "Загрузка..."}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <AnimalsForm />

      <AnimalsList />
    </div>
  );
}

