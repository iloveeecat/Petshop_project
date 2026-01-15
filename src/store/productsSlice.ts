import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types";
import {
  fetchProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productsApi";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  editingProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  editingProduct: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId: string) => {
    const products = await fetchProductsByCategory(categoryId);
    return products;
  }
);

export const addProduct = createAsyncThunk(
  "products/create",
  async (product: Omit<Product, "id">) => {
    const newProduct = await createProduct(product);
    return newProduct;
  }
);

export const editProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }: { id: string; product: Product }) => {
    const updatedProduct = await updateProduct(id, product);
    return updatedProduct;
  }
);

export const removeProduct = createAsyncThunk(
  "products/delete",
  async (id: string) => {
    await deleteProduct(id);
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setEditingProduct: (state, action: PayloadAction<Product | null>) => {
      state.editingProduct = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки продуктов";
      });

    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка создания продукта";
      });

    builder
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.editingProduct = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка обновления продукта";
      });

    builder
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
        if (state.editingProduct?.id === action.payload) {
          state.editingProduct = null;
        }
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка удаления продукта";
      });
  },
});

export const { setEditingProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;

