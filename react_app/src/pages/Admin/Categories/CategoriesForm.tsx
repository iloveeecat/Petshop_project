import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categorySchema, type CategoryFormData } from "./categorySchema";
import { createCategory, updateCategory } from "../../../api/categoriesApi";
import type { Category } from "../../../types";

interface CategoriesFormProps {
  editingCategory: Category | null;
  setEditingCategory: (category: Category | null) => void;
}

export default function CategoriesForm({
  editingCategory,
  setEditingCategory,
}: CategoriesFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      title: "",
      image: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
      setEditingCategory(null);
    },
    onError: (error) => {
      console.error("Ошибка при создании категории:", error);
      alert("Не удалось создать категорию. Попробуйте ещё раз.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, category }: { id: string; category: Omit<Category, "id"> }) =>
      updateCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
      setEditingCategory(null);
    },
    onError: (error) => {
      console.error("Ошибка при обновлении категории:", error);
      alert("Не удалось обновить категорию. Попробуйте ещё раз.");
    },
  });

  useEffect(() => {
    if (editingCategory) {
      setValue("title", editingCategory.title);
      setValue("image", editingCategory.image);
    } else {
      reset();
    }
  }, [editingCategory, setValue, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    if (editingCategory) {
      updateMutation.mutate({
        id: editingCategory.id,
        category: { title: data.title, image: data.image },
      });
    } else {
      createMutation.mutate({ title: data.title, image: data.image });
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    reset();
  };

  const isPending =
    isSubmitting ||
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {editingCategory
          ? "Редактировать категорию"
          : "Создать новую категорию"}
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Название категории
          </label>
          <input
            type="text"
            placeholder="Название категории"
            {...register("title")}
            className={`w-full border p-2 rounded ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Ссылка на изображение
          </label>
          <input
            type="text"
            placeholder="URL изображения"
            {...register("image")}
            className={`w-full border p-2 rounded ${
              errors.image ? "border-red-500" : ""
            }`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-purple-400 text-white px-6 py-2 rounded hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? "Сохранение..."
              : editingCategory
              ? "Сохранить изменения"
              : "Добавить категорию"}
          </button>
          {editingCategory && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Отмена
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

