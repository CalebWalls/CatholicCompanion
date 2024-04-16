import { createReducer, on } from '@ngrx/store';
import { GetDailyUpdatesFailure, GetDailyUpdatesSuccess } from './daily-relflections.actions';
import { DateResponse } from '../models/date-response';

export interface DailyReflectionsState {
  response: DateResponse | null;
  //isLoggedIn: boolean;
}

export const initialState: DailyReflectionsState = {
  response: null,
  //isLoggedIn: false,
};

export const reducer = createReducer(
  initialState,
  on(GetDailyUpdatesSuccess, (state, { response }) => {
    return { ...state, response };
  }),  //on(GetDailyUpdatesFailure, (state, { error }) => ({ ...state, response: `Failed To Retrieve Date ${error.message}`/*, isLoggedIn: false*/ })),
);
