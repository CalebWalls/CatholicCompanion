import { createAction, props } from '@ngrx/store';
import { DateRequest } from '../models/date-request';
import { DateResponse } from '../models/date-response';
import { DailyReadingsResponse } from '../models/daily-readings-response';

export const GetDailyUpdates = createAction('[Daily Updates] GetUpdate',props<{ request: DateRequest }>());
export const GetDailyUpdatesSuccess = createAction('[Daily Updates] GetUpdate Success',props<{ response: DateResponse }>());
export const GetDailyUpdatesFailure = createAction('[Daily Updates] GetUpdate Failure',props<{ error: any }>());

export const GetReadings = createAction('[Daily Updates] GetReadings',props<{ request: DateRequest }>());
export const GetReadingsSuccess = createAction('[Daily Updates] GetReadings Success',props<{ response: DailyReadingsResponse }>());
export const GetReadingsFailure = createAction('[Daily Updates] GetReadings Failure',props<{ error: any }>());
