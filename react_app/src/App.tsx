import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CategoriesPage } from "./pages/Admin/Categories/CategoriesPage";
import AnimalsPage from "./pages/Admin/Animals/AnimalsPage";
import { Provider } from "react-redux";
import { store } from "./store/store";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/catalog", element: <Catalog /> },
      { path: "/category/:categoryId", element: <Category /> },
      { path: "/cart", element: <Cart /> },
      { path: "/admin", element: <CategoriesPage /> },
      { path: "/admin/categories/:id", element: <AnimalsPage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
