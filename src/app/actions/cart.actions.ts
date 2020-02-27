import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { interiorProduct } from "../models/cartProduct.model";

export const GET_CART = "[PRODUCT] Add";
export const REMOVE_ALL_PRODS = "[PRODUCT] RemoveAll";
export const REMOVE_SPECIFIC = "[PRODUCT] RemoveSpecific";

export class GetCart implements Action {
  readonly type = GET_CART;

  constructor(public payload: interiorProduct) {}
}

export class RemoveSpecific implements Action {
  readonly type = REMOVE_SPECIFIC;

  constructor(public payload: number) {}
}

export class RemoveAll implements Action {
  readonly type = REMOVE_ALL_PRODS;

  constructor() {}
}

export type Actions = GetCart | RemoveAll | RemoveSpecific;
