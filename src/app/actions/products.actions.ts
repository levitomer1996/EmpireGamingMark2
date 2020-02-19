import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Product } from "../models/products.model";

export const GET_PRODUCTS = "[PRODUCT] Add";
export const REMOVE_TUTORIAL = "[PRODUCT] Remove";

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;

  constructor(public payload: Product) {}
}

export type Actions = GetProducts;
