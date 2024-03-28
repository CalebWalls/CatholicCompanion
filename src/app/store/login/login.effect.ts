import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { Login, LoginFailure, LoginSuccess } from './login.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class LoginEffects {
  login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(Login),
      mergeMap(action =>
        this.loginService.login(action.username, action.password).pipe(
          map(response => LoginSuccess({ response })),
          catchError((error) => of(LoginFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private loginService: LoginService) {}
}
