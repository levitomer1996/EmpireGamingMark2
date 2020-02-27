import { Action } from "@ngrx/store";
import { interiorProduct } from "../models/cartProduct.model";
import * as CartActions from "../actions/cart.actions";

export function cartReducer(
  state: interiorProduct[] = [],
  action: CartActions.Actions
) {
  // Section 3
  switch (action.type) {
    case CartActions.GET_CART:
      return [...state, action.payload];
    case CartActions.REMOVE_ALL_PRODS:
      return [];
    case CartActions.REMOVE_SPECIFIC:
      state.splice(action.payload, 1);
      return state;
    default:
      return state;
  }
}
