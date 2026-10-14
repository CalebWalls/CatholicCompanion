import { createReducer, on } from '@ngrx/store';
import {
  GetDailyUpdates,
  GetDailyUpdatesFailure,
  GetDailyUpdatesSuccess,
  GetReadings,
  GetReadingsFailure,
  GetReadingsSuccess,
} from './daily-relflections.actions';
import { DateResponse } from '../models/date-response';
import { DailyReadingsResponse } from '../models/daily-readings-response';

export interface DailyReflectionsState {
  dateResponse: DateResponse | null;
  dailyReadingsResponse: DailyReadingsResponse | null;
  calendarLoading: boolean;
  readingsLoading: boolean;
  calendarError: string | null;
  readingsError: string | null;
}

export const initialState: DailyReflectionsState = {
  dateResponse: null,
  dailyReadingsResponse: null,
  calendarLoading: false,
  readingsLoading: false,
  calendarError: null,
  readingsError: null,
};

export const reducer = createReducer(
  initialState,
  on(GetDailyUpdates, (state) => ({
    ...state,
    calendarLoading: true,
    calendarError: null,
    dateResponse: null,
  })),
  on(GetDailyUpdatesSuccess, (state, { response }) => ({
    ...state,
    calendarLoading: false,
    dateResponse: response,
    calendarError: response.error || null,
  })),
  on(GetDailyUpdatesFailure, (state) => ({
    ...state,
    calendarLoading: false,
    calendarError: 'The calendar could not be loaded. Please try again.',
  })),
  on(GetReadings, (state) => ({
    ...state,
    readingsLoading: true,
    readingsError: null,
    dailyReadingsResponse: null,
  })),
  on(GetReadingsSuccess, (state, { response }) => ({
    ...state,
    readingsLoading: false,
    dailyReadingsResponse: response,
    readingsError: response.error || null,
  })),
  on(GetReadingsFailure, (state) => ({
    ...state,
    readingsLoading: false,
    readingsError: 'The readings could not be loaded. Please try again.',
  })),
);
