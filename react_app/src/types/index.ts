export type Category = {
    id: string;
    title: string;
    image: string;
}

export type Product = {
  id: string;
  name: string;
  age: number;
  price: number;
  description: string;
  image: string;
  breed: string;
  categoryId: string;
};