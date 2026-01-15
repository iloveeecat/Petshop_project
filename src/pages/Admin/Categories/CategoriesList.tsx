import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deleteCategory, fetchCategories } from "../../../api/categoriesApi";
import type { Category } from "../../../types";

interface CategoriesListProps {
  editingCategory: Category | null;
  setEditingCategory: (category: Category | null) => void;
}

export default function CategoriesList({
  editingCategory,
  setEditingCategory,
}: CategoriesListProps) {
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      if (editingCategory) {
        setEditingCategory(null);
      }
    },
    onError: (error) => {
      console.error("Ошибка при удалении категории:", error);
      alert("Не удалось удалить категорию. Попробуйте ещё раз.");
    },
  });

  const isPending = deleteMutation.isPending;

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDelete = async (categoryId: string) => {
    if (
      window.confirm(
        "Вы уверены, что хотите удалить эту категорию? Все животные в этой категории также будут удалены."
      )
    ) {
      deleteMutation.mutate(categoryId);
    }
  };

  if (isLoading) {
    return <p className="text-center p-8">Загрузка...</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Существующие категории</h2>

      {categories.length === 0 ? (
        <p className="text-center text-gray-500">Нет категорий</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-purple-100 p-5 rounded-lg shadow-md"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover rounded mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
              <h3 className="text-xl font-semibold mb-4">
                {category.title}
              </h3>

              <div className="flex flex-col gap-2">
                <Link
                  to={`/admin/categories/${category.id}`}
                  className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400 text-center"
                >
                  Управление животными
                </Link>
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-green-300 text-white px-4 py-2 rounded hover:bg-green-400"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  disabled={isPending}
                  className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

