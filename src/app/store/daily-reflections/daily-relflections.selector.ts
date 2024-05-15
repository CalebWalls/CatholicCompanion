import { createSelector } from '@ngrx/store';
import { DailyReflectionsState } from './daily-relflections.reducer';
import { AppState } from 'src/app/app.state';

// Selector for the date state
export const selectDailyReflections = createSelector(
  (state: AppState) => state.dailyReflections,
  (dailyRefections: DailyReflectionsState) => dailyRefections
);