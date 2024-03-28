import { createSelector } from '@ngrx/store';
import { LoginState } from './login.reducer';
import { AppState } from 'src/app/app.state';

export const selectLoginState = (state: AppState) => state.login;

export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state: LoginState) => state.isLoggedIn
);