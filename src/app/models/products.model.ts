export interface Product {
  _id: string;
  name: string;
  category: string;
  platform: string;
  price: number;
  img: string;
  time_purchase: number;
}
export interface ProductsArray {
  array: Product[];
}
