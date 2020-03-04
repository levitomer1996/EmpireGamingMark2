import {TempoOrder} from '../models/tempo.model'
import * as TempoActions from '../actions/tempoOrder.actions'

const initialState: TempoOrder = { total: 0, products: [], name: "",city:'', adress: 
'' };

export function TempoReducer(
  state = initialState,
  action: TempoActions.Actions
) {
  switch (action.type) {
    case TempoActions.ADD_TEMPO:
      console.log(state);
      return action.payload;
    default:
      return state;
  }
}
