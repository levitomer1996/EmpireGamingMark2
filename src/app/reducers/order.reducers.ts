import * as orderActions from "../actions/orders.actions";
import { Order } from "../models/order.model";

const initialState: Order = { total: 0, products: [], userOwner: "" };

export function orderReducer(
  state = initialState,
  action: orderActions.Actions
) {
  switch (action.type) {
    case orderActions.ADD_ORDER:
      console.log(state);
      return action.payload;
    default:
      return state;
  }
}
