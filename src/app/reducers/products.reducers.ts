import { Action } from "@ngrx/store";
import { Product } from "../models/products.model";
import * as ProductActions from "../actions/products.actions";

const initialState: Product = {
  _id: "",
  name: "Tomer",
  category: "",
  platform: "",
  price: 0,
  img: "",
  time_purchase: 0
};

export function productReducer(
  state: Product[] = [initialState],
  action: ProductActions.Actions
) {
  // Section 3
  switch (action.type) {
    case ProductActions.GET_PRODUCTS:
      return [...state, action.payload];
    default:
      return state;
  }
}
