import { Product } from "./models/products.model";
import { isLogged } from "./models/isLogged.mode";
import { interiorProduct } from "./models/cartProduct.model";

export interface AppState {
  readonly product: Product[];
}
export interface LogState {
  readonly isLogged;
}

export interface CartState {
  readonly cart: interiorProduct[];
}
