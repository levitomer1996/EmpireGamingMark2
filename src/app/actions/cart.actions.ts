import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { interiorProduct } from "../models/cartProduct.model";

export const GET_CART = "[PRODUCT] Add";

export class GetCart implements Action {
  readonly type = GET_CART;

  constructor(public payload: interiorProduct) {}
}

export type Actions = GetCart;
