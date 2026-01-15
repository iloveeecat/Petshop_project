import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api/categoriesApi";

function Catalog() {
  const { data : categories = [], isLoading} = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <>
      <h1 className="ml-20 mt-10">Каталог животных</h1>

      {isLoading && <p className="flex gap-30 justify-center">Loading...</p>}

      <ul className="flex flex-wrap gap-30 justify-center">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/category/${category.id}`}
              className="relative flex flex-col items-center justify-center"
            >
              <img src={category.image} alt={category.title} className="w-110" />
              <p className="text-2xl">{category.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Catalog;
