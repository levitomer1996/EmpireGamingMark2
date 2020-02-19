import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { isLogged } from "../models/isLogged.mode";

export const SET_LOGGED = "[ISLOGGED] SET_LOGGED";

export class Set_Logged implements Action {
  readonly type = SET_LOGGED;

  constructor(public payload) {}
}

export type Actions = Set_Logged;
