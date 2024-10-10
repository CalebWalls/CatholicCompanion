import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { GetReadings } from 'src/app/store/daily-reflections/daily-relflections.actions';
import { selectDailyReflections } from 'src/app/store/daily-reflections/daily-relflections.selector';
import { DailyReadingsResponse } from 'src/app/store/models/daily-readings-response';

@Component({
  selector: 'daily-readings',
  templateUrl: './daily-readings.component.html',
  styleUrls: ['./daily-readings.component.css']
})
export class DailyReadingsComponent implements OnInit {
  date: Date = new Date(); // Initialize date to today's date
  public dailyReadingsResponse$: Observable<DailyReadingsResponse | null> | undefined;

  constructor(private store: Store<AppState>, private router: Router) { }

  navigateHome() {
    this.router.navigate(['']);
  }

  incrementDate() {
    this.date.setDate(this.date.getDate() + 1); // Increment the date by 1 day
    this.adjustDateToTimeZone();
    this.getReadings();
  }

  decrementDate() {
    this.date.setDate(this.date.getDate() - 1); // Decrement the date by 1 day
    this.adjustDateToTimeZone();
    this.getReadings();
  }

  adjustDateToTimeZone() {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDateString = this.date.toLocaleString('en-US', { timeZone, hour12: false });
    this.date = new Date(localDateString);
  }

  getReadings() {
    const formattedDate = this.formatDateToLocalISOString(this.date);
    this.store.dispatch(GetReadings({ request: { date: formattedDate } }));
    this.dailyReadingsResponse$ = this.store.select(selectDailyReflections).pipe(
      tap(state => console.log('Selected state:', state.dailyReadingsResponse)),
      map(readings => readings?.dailyReadingsResponse)
    );
  }

  formatDateToLocalISOString(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  navigateToUrl(url: string | undefined): void {
    if (url) {
      window.open(url, "_blank");
    }
  }

  ngOnInit(): void {
    this.adjustDateToTimeZone(); // Adjust the date to the user's time zone
    this.getReadings(); // Fetch the readings when the component is initialized
  }
}
