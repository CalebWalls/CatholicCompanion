import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DailyReflectionsService } from './daily-relflections.service';
import { GetDailyUpdates, GetDailyUpdatesFailure, GetDailyUpdatesSuccess, GetReadings, GetReadingsFailure, GetReadingsSuccess } from './daily-relflections.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class DailyReflectionsEffects {
  liturgicalDate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDailyUpdates),
      mergeMap(action =>
        this.dailyReflectionsService.liturgicalCalendar(action.request).pipe(
          tap(response => console.log('API response:', response)),
          map(response => GetDailyUpdatesSuccess({ response })),
          catchError((error) => of(GetDailyUpdatesFailure({ error })))
        )
      )
    )
  );

  dailyReadings$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GetReadings),
      mergeMap(action =>
        this.dailyReflectionsService.dailyReadings(action.request).pipe(
          tap(response => {
            console.log('API response:', response);
            if (response) {
              console.log('Response is returned from the API');
            } else {
              console.log('No response is returned from the API');
            }
          }),
          map(response => GetReadingsSuccess({ response })),
          catchError((error) => of(GetReadingsFailure({ error })))
        )
      )
    )
  );
  

  constructor(private actions$: Actions, private dailyReflectionsService: DailyReflectionsService) {}
}
