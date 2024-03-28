import { LoginState } from "./store/login/login.reducer";

export interface AppState {
  login: LoginState;
  // other states go here...
}