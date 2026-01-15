import { useState } from "react";
import type { Category } from "../../../types";
import CategoriesForm from "./CategoriesForm";
import CategoriesList from "./CategoriesList";

export function CategoriesPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Админ-панель: категории</h1>

      <CategoriesForm
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
      />

      <CategoriesList
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
      />
    </div>
  );
}

