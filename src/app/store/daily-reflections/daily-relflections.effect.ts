import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DailyReflectionsService } from './daily-relflections.service';
import { GetDailyUpdates, GetDailyUpdatesFailure, GetDailyUpdatesSuccess } from './daily-relflections.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class DailyReflectionsEffects {
  login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GetDailyUpdates),
      mergeMap(action =>
        this.dailyReflectionsService.liturgicalCalendar(action.request).pipe(
          tap(response => console.log('API response:', response)), // <-- Add this line
          map(response => GetDailyUpdatesSuccess({ response })),
          catchError((error) => of(GetDailyUpdatesFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private dailyReflectionsService: DailyReflectionsService) {}
}
