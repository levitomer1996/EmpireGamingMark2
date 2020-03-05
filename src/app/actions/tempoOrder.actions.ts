import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { TempoOrder } from "../models/tempo.model";

export const ADD_TEMPO = "[TempoOrder] Add";
export const ADD_DIGIT = "[TempoOrder] AddD";

export class AddTempo implements Action {
  readonly type = ADD_TEMPO;

  constructor(public payload: TempoOrder) {}
}
export class AddDigit implements Action {
  readonly type = ADD_DIGIT;

  constructor(public payload: Number) {}
}

export type Actions = AddTempo | AddDigit;
