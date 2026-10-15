import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetReadings } from '../../store/daily-reflections/daily-relflections.actions';
import { selectDailyReflections } from '../../store/daily-reflections/daily-relflections.selector';
import { localDateKey } from '../../services/companion.service';
import {
  DailyReadingsResponse,
  ReadingSet,
} from '../../store/models/daily-readings-response';

@Component({
  selector: 'daily-readings',
  templateUrl: './daily-readings.component.html',
  styleUrls: ['./daily-readings.component.css'],
})
export class DailyReadingsComponent implements OnInit, OnDestroy {
  date = new Date();
  state$ = this.store.select(selectDailyReflections);
  selectedSetIndex = 0;
  selectedOptions: Record<number, number> = {};
  sections = [
    { key: 'firstReading' as const, title: 'First reading' },
    { key: 'responsorialPsalm' as const, title: 'Responsorial psalm' },
    { key: 'secondReading' as const, title: 'Second reading' },
    { key: 'alleluiaVerse' as const, title: 'Gospel acclamation' },
    { key: 'gospelReading' as const, title: 'Gospel' },
  ];

  private dateSubscription?: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dateSubscription = this.route.queryParamMap
      .pipe(
        map((params) => params.get('date')),
        distinctUntilChanged(),
      )
      .subscribe((date) => {
        this.date = this.dateFromUrl(date);
        this.load();
      });
  }

  ngOnDestroy(): void {
    this.dateSubscription?.unsubscribe();
  }

  changeDate(days: number): void {
    const next = new Date(this.date);
    next.setDate(next.getDate() + days);
    this.navigateToDate(next);
  }

  today(): void {
    this.navigateToDate(new Date());
  }

  get selectedDate(): string {
    return localDateKey(this.date);
  }

  selectDate(value: string): void {
    const date = this.dateFromUrl(value);
    if (localDateKey(date) === value) {
      this.navigateToDate(date);
    }
  }

  private navigateToDate(date: Date): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { date: localDateKey(date) },
      queryParamsHandling: 'merge',
    });
  }

  private dateFromUrl(value: string | null): Date {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      if (year >= 1900 && year <= 2100 && localDateKey(date) === value) {
        return date;
      }
    }
    return new Date();
  }

  load(): void {
    this.selectedSetIndex = 0;
    this.selectedOptions = {};
    this.store.dispatch(
      GetReadings({ request: { date: localDateKey(this.date) } }),
    );
  }

  chooseSet(index: number): void {
    this.selectedSetIndex = Number(index);
    this.selectedOptions = {};
  }

  activeSet(readings: DailyReadingsResponse): ReadingSet | null {
    return readings.readingSets?.[this.selectedSetIndex] || null;
  }

  get sourceUrl(): string {
    return (
      'https://bible.usccb.org/bible/readings/' +
      localDateKey(this.date).slice(5, 7) +
      localDateKey(this.date).slice(8, 10) +
      localDateKey(this.date).slice(2, 4) +
      '.cfm'
    );
  }
}
