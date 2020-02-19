import { Action } from "@ngrx/store";
import { isLogged } from "../models/isLogged.mode";
import * as loggedActions from "../actions/isLogged.actions";

const initialState = { logged: false, userName: "", fname: "" };

export function isLoggedReducer(
  state = initialState,
  action: loggedActions.Actions
) {
  switch (action.type) {
    case loggedActions.SET_LOGGED:
      console.log(state);
      return action.payload;
    default:
      return state;
  }
}
