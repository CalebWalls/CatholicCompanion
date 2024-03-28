import { createReducer, on } from '@ngrx/store';
import { LoginFailure, LoginSuccess } from './login.actions';

export interface LoginState {
  response: string | null;
  isLoggedIn: boolean;
}

export const initialState: LoginState = {
  response: null,
  isLoggedIn: false,
};

export const reducer = createReducer(
  initialState,
  on(LoginSuccess, (state, { response }) => ({ ...state, response, isLoggedIn: true })),
  on(LoginFailure, (state, { error }) => ({ ...state, response: `Login failed: ${error.message}`, isLoggedIn: false })),
);
