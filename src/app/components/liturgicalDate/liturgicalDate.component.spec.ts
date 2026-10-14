import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/daily-reflections/daily-relflections.reducer';
import { LiturgicalDateComponent } from './liturgicalDate.component';

describe('Calendar reading links', () => {
  it('links each celebration to its own calendar date', async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LiturgicalDateComponent],
      providers: [
        provideMockStore({
          initialState: {
            dailyReflections: {
              ...initialState,
              dateResponse: {
                date: ['2026-11-01T00:00:00', '2026-11-02T00:00:00'],
                liturgicalDate: ['All Saints', 'All Souls'],
              },
            },
          },
        }),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(LiturgicalDateComponent);
    fixture.detectChanges();
    const links: HTMLAnchorElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.readings-link'),
    );
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe(
      '/daily-readings?date=2026-11-01',
    );
    expect(links[1].getAttribute('href')).toBe(
      '/daily-readings?date=2026-11-02',
    );
    expect(links[0].getAttribute('aria-label')).toContain('November 1, 2026');
  });
});
