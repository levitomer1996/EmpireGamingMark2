import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { TempoOrder } from "../models/tempo.model";

export const ADD_TEMPO = "[TempoOrder] Add";

export class AddTempo implements Action {
  readonly type = ADD_TEMPO;

  constructor(public payload: TempoOrder) {}
}

export type Actions = AddTempo;
