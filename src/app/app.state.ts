import { Product } from "./models/products.model";
import { isLogged } from "./models/isLogged.mode";
import { interiorProduct } from "./models/cartProduct.model";
import { Order } from "./models/order.model";
import { TempoOrder } from "./models/tempo.model";

export interface AppState {
  readonly product: Product[];
}
export interface LogState {
  readonly isLogged;
}

export interface CartState {
  readonly cart: interiorProduct[];
}

export interface OrderState {
  readonly order: Order;
}
export interface TempoState {
  readonly Tempo: TempoOrder;
}
