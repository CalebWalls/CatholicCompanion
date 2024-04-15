import { createAction, props } from '@ngrx/store';
import { DateRequest } from '../models/date-request';
import { DateResponse } from '../models/date-response';

export const GetDailyUpdates = createAction(
  '[Daily Updates] GetUpdate',
  props<{ request: DateRequest }>()
);

export const GetDailyUpdatesSuccess = createAction(
  '[Daily Updates] GetUpdate Success',
  props<{ response: DateResponse }>()
);

export const GetDailyUpdatesFailure = createAction(
  '[Daily Updates] GetUpdate Failure',
  props<{ error: any }>()
);
