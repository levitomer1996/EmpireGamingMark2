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
      console.log(state);
      return [...state, action.payload];
    default:
      return state;
  }
}
