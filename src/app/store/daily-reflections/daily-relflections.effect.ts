import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DailyReflectionsService } from './daily-relflections.service';
import {
  GetDailyUpdates,
  GetDailyUpdatesFailure,
  GetDailyUpdatesSuccess,
  GetReadings,
  GetReadingsFailure,
  GetReadingsSuccess,
} from './daily-relflections.actions';

@Injectable()
export class DailyReflectionsEffects {
  liturgicalDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDailyUpdates),
      switchMap((action) =>
        this.dailyReflectionsService.liturgicalCalendar(action.request).pipe(
          map((response) => GetDailyUpdatesSuccess({ response })),
          catchError((error) => of(GetDailyUpdatesFailure({ error }))),
        ),
      ),
    ),
  );

  dailyReadings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetReadings),
      switchMap((action) =>
        this.dailyReflectionsService.dailyReadings(action.request).pipe(
          map((response) => GetReadingsSuccess({ response })),
          catchError((error) => of(GetReadingsFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private dailyReflectionsService: DailyReflectionsService,
  ) {}
}
