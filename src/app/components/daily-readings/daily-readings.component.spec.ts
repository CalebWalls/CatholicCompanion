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
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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

// Exercise the actual template so selecting a Mass or alternate reading updates its text.

describe('Daily readings choices', () => {
  beforeEach(async () => {
    const state = {
      ...initialState,
      dailyReadingsResponse: {
        readingSets: [
          {
            title: 'Vigil Mass',
            url: 'https://example.com/vigil',
            sections: [
              {
                key: 'gospelReading',
                title: 'Gospel',
                options: [
                  { reference: 'Long reference', text: 'Long gospel' },
                  { reference: 'Short reference', text: 'Short gospel' },
                ],
              },
            ],
          },
          {
            title: 'Mass during the Day',
            url: 'https://example.com/day',
            sections: [
              {
                key: 'gospelReading',
                title: 'Gospel',
                options: [{ text: 'Day gospel' }],
              },
            ],
          },
        ],
      },
    };
    await TestBed.configureTestingModule({
      declarations: [DailyReadingsComponent],
      imports: [CommonModule, FormsModule, RouterTestingModule],
      providers: [
        {
          provide: Store,
          useValue: { select: () => of(state), dispatch: () => {} },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('renders and switches alternate readings and Masses without leaving the page', async () => {
    const fixture = TestBed.createComponent(DailyReadingsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    expect(page.textContent).toContain('Long gospel');
    expect(page.textContent).not.toContain('Short gospel');
    const options = page.querySelector(
      '#reading-option-0',
    ) as HTMLSelectElement;
    options.selectedIndex = 1;
    options.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(page.textContent).toContain('Short gospel');
    expect(page.textContent).not.toContain('Long gospel');
    const mass = page.querySelector('#reading-set') as HTMLSelectElement;
    mass.selectedIndex = 1;
    mass.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(page.textContent).toContain('Day gospel');
    expect(page.textContent).not.toContain('Short gospel');
    expect(page.querySelector('#reading-option-0')).toBeNull();
    expect(
      page.querySelector('aside a[target="_blank"]')?.getAttribute('href'),
    ).toBe('https://example.com/day');
    fixture.destroy();
  });
});
