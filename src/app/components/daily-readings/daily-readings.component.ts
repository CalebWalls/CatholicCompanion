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
    this.date = new Date(this.date.setDate(this.date.getDate() + 1)); // Increment the date by 1 day
    this.getReadings();
  }

  decrementDate() {
    this.date = new Date(this.date.setDate(this.date.getDate() - 1)); // Decrement the date by 1 day
    this.getReadings();
  }

  getReadings() {
    const formattedDate = this.date.toISOString();
    this.store.dispatch(GetReadings({ request: { date: formattedDate } }));
    this.dailyReadingsResponse$ = this.store.select(selectDailyReflections).pipe(
      tap(state => console.log('Selected state:', state.dailyReadingsResponse)),
      map(readings => readings?.dailyReadingsResponse)
    );
  }

  navigateToUrl(url: string | undefined): void {
    if (url) {
      window.open(url, "_blank");
    }
  }
  

  ngOnInit(): void {
    this.getReadings(); // Fetch the readings when the component is initialized
  }

  getDate(date: Date){
    
  }
}


