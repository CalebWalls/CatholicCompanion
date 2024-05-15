import { createReducer, on } from '@ngrx/store';
import { GetDailyUpdatesFailure, GetDailyUpdatesSuccess, GetReadingsSuccess } from './daily-relflections.actions';
import { DateResponse } from '../models/date-response';
import { DailyReadingsResponse } from '../models/daily-readings-response';

export interface DailyReflectionsState {
  dateResponse: DateResponse | null;
  dailyReadingsResponse: DailyReadingsResponse | null;
  //isLoggedIn: boolean;
}

export const initialState: DailyReflectionsState = {
  dateResponse: null,
  dailyReadingsResponse: null,
  //isLoggedIn: false,
};

export const reducer = createReducer(
  initialState,
  on(GetDailyUpdatesSuccess, (state, { response }) => {
    return { ...state, dateResponse: response };
  }),  //on(GetDailyUpdatesFailure, (state, { error }) => ({ ...state, response: `Failed To Retrieve Date ${error.message}`/*, isLoggedIn: false*/ })),
  on(GetReadingsSuccess, (state, { response }) => {
    const newState = { ...state, dailyReadingsResponse: response };
    console.log('New state:', newState);
    return newState;
  }), 
);
