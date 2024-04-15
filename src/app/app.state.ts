import { DailyReflectionsState } from "./store/daily-reflections/daily-relflections.reducer";

export interface AppState {
  date: DailyReflectionsState;
  // other states go here...
}