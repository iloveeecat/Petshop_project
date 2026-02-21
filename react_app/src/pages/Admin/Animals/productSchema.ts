import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .required("Имя обязательно")
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя не должно превышать 50 символов"),
  age: yup
    .number()
    .required("Возраст обязателен")
    .typeError("Возраст должен быть числом")
    .min(0, "Возраст не может быть отрицательным")
    .max(100, "Возраст не может превышать 100 лет"),
  price: yup
    .number()
    .required("Цена обязательна")
    .typeError("Цена должна быть числом")
    .min(0, "Цена не может быть отрицательной")
    .max(1000000, "Цена слишком большая"),
  description: yup
    .string()
    .required("Описание обязательно")
    .min(10, "Описание должно содержать минимум 10 символов")
    .max(500, "Описание не должно превышать 500 символов"),
  image: yup
    .string()
    .required("Ссылка на изображение обязательна")
    .test(
      "is-url-or-path",
      "Введите корректный URL или путь к изображению",
      (value) => {
        if (!value) return false;
        try {
          new URL(value);
          return true;
        } catch {
          const pathPattern = new RegExp(
            "^\\.?/?([\\w\\-_]+/)*[\\w\\-_]+\\.[\\w]+$"
          );
          return pathPattern.test(value) || value.includes(".");
        }
      }
    ),
  breed: yup
    .string()
    .required("Порода обязательна")
    .min(2, "Порода должна содержать минимум 2 символа")
    .max(50, "Порода не должна превышать 50 символов"),
});

export type ProductFormData = yup.InferType<typeof productSchema>;
