import { createAction, props } from '@ngrx/store';

export const Login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string }>()
);

export const LoginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ response: string }>()
);

export const LoginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ error: any }>()
);
