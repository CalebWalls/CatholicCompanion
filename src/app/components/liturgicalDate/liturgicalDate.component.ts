import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetDailyUpdates } from '../../store/daily-reflections/daily-relflections.actions';
import { selectDailyReflections } from '../../store/daily-reflections/daily-relflections.selector';
import { localDateKey } from '../../services/companion.service';

@Component({
  selector: 'app-liturgicalDate',
  templateUrl: './liturgicalDate.component.html',
  styleUrls: ['./liturgicalDate.component.css'],
})
export class LiturgicalDateComponent implements OnInit {
  date = new Date();
  state$ = this.store.select(selectDailyReflections);
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.load();
  }

  changeWeek(days: number): void {
    const next = new Date(this.date);
    next.setDate(next.getDate() + days);
    this.date = next;
    this.load();
  }

  today(): void {
    this.date = new Date();
    this.load();
  }

  load(): void {
    this.store.dispatch(
      GetDailyUpdates({ request: { date: localDateKey(this.date) } }),
    );
  }
}
