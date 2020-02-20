import { Action } from "@ngrx/store";
import { interiorProduct } from "../models/cartProduct.model";
import * as CartActions from "../actions/cart.actions";
const initialState: interiorProduct = {
  _id: "",
  name: "Tomer",
  category: "",
  platform: "",
  price: 0,
  img: "",
  time_purchase: 0
};

export function cartReducer(
  state: interiorProduct[] = [initialState],
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
