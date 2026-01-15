import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "./productSchema";
import type { ProductFormData } from "./productSchema";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchProducts,
  addProduct,
  editProduct,
  setEditingProduct,
} from "../../../store/productsSlice";

export default function AnimalsForm() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { loading, editingProduct } = useAppSelector((state) => state.products);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      age: 0,
      price: 0,
      description: "",
      image: "",
      breed: "",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProducts(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (editingProduct) {
      setValue("name", editingProduct.name);
      setValue("age", editingProduct.age);
      setValue("price", editingProduct.price);
      setValue("description", editingProduct.description);
      setValue("image", editingProduct.image);
      setValue("breed", editingProduct.breed);
    } else {
      reset();
    }
  }, [editingProduct, setValue, reset]);

  const onSubmit = async (data: ProductFormData) => {
    if (!id) return;

    const productData = {
      name: data.name,
      age: data.age,
      price: data.price,
      description: data.description,
      image: data.image,
      breed: data.breed,
      categoryId: id,
    };

    if (editingProduct) {
      await dispatch(
        editProduct({
          id: editingProduct.id,
          product: { ...editingProduct, ...productData },
        })
      );
    } else {
      await dispatch(addProduct(productData));
    }
    reset();
  };

  const handleCancelEdit = () => {
    dispatch(setEditingProduct(null));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {editingProduct ? "Редактировать карточку" : "Создать новую карточку"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Имя</label>
          <input
            type="text"
            placeholder="Имя животного"
            {...register("name")}
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Возраст</label>
          <input
            type="number"
            placeholder="Возраст"
            {...register("age", { valueAsNumber: true })}
            className={`w-full border p-2 rounded ${
              errors.age ? "border-red-500" : ""
            }`}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Цена</label>
          <input
            type="number"
            placeholder="Цена"
            {...register("price", { valueAsNumber: true })}
            className={`w-full border p-2 rounded ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Порода</label>
          <input
            type="text"
            placeholder="Порода"
            {...register("breed")}
            className={`w-full border p-2 rounded ${
              errors.breed ? "border-red-500" : ""
            }`}
          />
          {errors.breed && (
            <p className="text-red-500 text-sm mt-1">
              {errors.breed.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
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
            <p className="text-red-500 text-sm mt-1">
              {errors.image.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Описание</label>
          <textarea
            placeholder="Описание животного"
            {...register("description")}
            className={`w-full border p-2 rounded ${
              errors.description ? "border-red-500" : ""
            }`}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="bg-purple-400 text-white px-6 py-2 rounded hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading || isSubmitting
            ? "Сохранение..."
            : editingProduct
            ? "Сохранить изменения"
            : "Создать карточку"}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}
