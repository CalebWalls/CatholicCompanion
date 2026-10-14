import {
  ActivatedRoute,
  convertToParamMap,
  ParamMap,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { AppState } from '../../app.state';
import { localDateKey } from '../../services/companion.service';
import { GetReadings } from '../../store/daily-reflections/daily-relflections.actions';
import { initialState } from '../../store/daily-reflections/daily-relflections.reducer';
import { DailyReadingsComponent } from './daily-readings.component';

describe('Daily readings date navigation', () => {
  let params: BehaviorSubject<ParamMap>;
  let store: jasmine.SpyObj<Store<AppState>>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;
  let component: DailyReadingsComponent;

  beforeEach(() => {
    params = new BehaviorSubject(convertToParamMap({ date: '2026-11-01' }));
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    store.select.and.returnValue(of(initialState));
    router = jasmine.createSpyObj('Router', ['navigate']);
    route = { queryParamMap: params.asObservable() } as ActivatedRoute;
    component = new DailyReadingsComponent(store, route, router);
    component.ngOnInit();
  });

  afterEach(() => component.ngOnDestroy());

  it('loads the linked calendar day without shifting it to the previous day', () => {
    expect(localDateKey(component.date)).toBe('2026-11-01');
    expect(store.dispatch).toHaveBeenCalledWith(
      GetReadings({ request: { date: '2026-11-01' } }),
    );
    expect(component.sourceUrl).toContain('110126.cfm');
  });

  it('responds to changed query parameters while the readings page stays open', () => {
    params.next(convertToParamMap({ date: '2026-11-02' }));
    expect(localDateKey(component.date)).toBe('2026-11-02');
    expect(store.dispatch).toHaveBeenCalledWith(
      GetReadings({ request: { date: '2026-11-02' } }),
    );
  });

  it('updates the URL when moving between days or returning to today', () => {
    component.changeDate(-1);
    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: route,
      queryParams: { date: '2026-10-31' },
      queryParamsHandling: 'merge',
    });
    component.today();
    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: route,
      queryParams: { date: localDateKey(new Date()) },
      queryParamsHandling: 'merge',
    });
  });

  it('uses today when the URL date is absent or invalid', () => {
    for (const date of [null, '2026-02-30', 'not-a-date', '1800-01-01']) {
      params.next(convertToParamMap(date ? { date } : {}));
      expect(localDateKey(component.date)).toBe(localDateKey(new Date()));
    }
  });

  it('stops loading dates after leaving the page', () => {
    component.ngOnDestroy();
    store.dispatch.calls.reset();
    params.next(convertToParamMap({ date: '2026-11-03' }));
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
