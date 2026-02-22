import * as yup from "yup";

export const categorySchema = yup.object({
  title: yup
    .string()
    .required("Название категории обязательно")
    .min(2, "Название должно содержать минимум 2 символа")
    .max(50, "Название не должно превышать 50 символов"),
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
          // принимаем пути вида file.png, /file.png, ./file.png, images/file.png
          const pathPattern = new RegExp("^\\.?/?([\\w\\-_]+/)*[\\w\\-_]+\\.[\\w]+$");
          return pathPattern.test(value) || value.includes(".");
        }
      }
    ),
});

export type CategoryFormData = yup.InferType<typeof categorySchema>;

