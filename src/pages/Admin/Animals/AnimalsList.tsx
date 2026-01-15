import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  removeProduct,
  setEditingProduct,
} from "../../../store/productsSlice";
import type { Product } from "../../../types";

export default function AnimalsList() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  const handleEdit = (product: Product) => {
    dispatch(setEditingProduct(product));
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту карточку?")) {
      await dispatch(removeProduct(productId));
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Существующие животные</h2>

      {loading && products.length === 0 ? (
        <p className="text-center">Загрузка...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">
          Нет животных в этой категории
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-purple-100 p-5 rounded-lg shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p className="text-xl font-semibold mb-2">
                Имя: {product.name}
              </p>
              <p className="text-l mb-1">Возраст: {product.age}</p>
              <p className="text-l mb-1">Порода: {product.breed}</p>
              <p className="text-l mb-1">Цена: {product.price}₽</p>
              <p className="text-l mb-4">Описание: {product.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400 flex-1"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400 flex-1"
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

