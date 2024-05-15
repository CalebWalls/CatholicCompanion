import { DailyReflectionsState } from "./store/daily-reflections/daily-relflections.reducer";

export interface AppState {
  dailyReflections: DailyReflectionsState;
  // other states go here...
}