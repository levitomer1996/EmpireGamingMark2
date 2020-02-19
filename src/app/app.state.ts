import { Product } from "./models/products.model";
import { isLogged } from "./models/isLogged.mode";

export interface AppState {
  readonly product: Product[];
}
export interface LogState {
  readonly isLogged;
}
