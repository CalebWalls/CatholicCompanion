import { reducer, initialState } from './daily-relflections.reducer';
import {
  GetReadings,
  GetReadingsFailure,
  GetReadingsSuccess,
  GetDailyUpdatesSuccess,
} from './daily-relflections.actions';

describe('Daily reflections state', () => {
  it('clears old readings while another date loads', () => {
    const previous = reducer(
      initialState,
      GetReadingsSuccess({ response: { firstReading: 'Yesterday' } }),
    );
    const loading = reducer(
      previous,
      GetReadings({ request: { date: '2026-10-14' } }),
    );
    expect(loading.readingsLoading).toBeTrue();
    expect(loading.dailyReadingsResponse).toBeNull();
    const failed = reducer(loading, GetReadingsFailure({ error: 'offline' }));
    expect(failed.readingsLoading).toBeFalse();
    expect(failed.readingsError).toContain('try again');
  });

  it('shows errors returned by upstream data services', () => {
    const readings = reducer(
      initialState,
      GetReadingsSuccess({ response: { error: 'Unavailable' } }),
    );
    const calendar = reducer(
      initialState,
      GetDailyUpdatesSuccess({
        response: { date: [], liturgicalDate: [], error: 'Missing days' },
      }),
    );
    expect(readings.readingsError).toBe('Unavailable');
    expect(calendar.calendarError).toBe('Missing days');
  });
});
