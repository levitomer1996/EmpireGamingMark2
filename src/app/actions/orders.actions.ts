import { Action } from "@ngrx/store";
import { Order } from "../models/order.model";

export const ADD_ORDER = "[Order] Add";

export class AddOrder implements Action {
  readonly type = ADD_ORDER;

  constructor(public payload: Order) {}
}

export type Actions = AddOrder;
