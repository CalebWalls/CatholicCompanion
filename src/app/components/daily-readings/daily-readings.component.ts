import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { GetReadings } from 'src/app/store/daily-reflections/daily-relflections.actions';
import { DailyReflectionsState } from 'src/app/store/daily-reflections/daily-relflections.reducer';

@Component({
  selector: 'daily-readings',
  templateUrl: './daily-readings.component.html',
  styleUrls: ['./daily-readings.component.css']
})
export class DailyReadingsComponent implements OnInit {
    date = new Date();
    liturgicalDatesWithDate$!: Observable<{ liturgicalDate: string, date: Date }[]>;
    dateState$: Observable<DailyReflectionsState>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.dateState$ = this.store.select(state => state.date);
   }

  navigateHome() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.liturgicalDatesWithDate$ = this.dateState$.pipe(map(state => {
      console.log('Selected state:', state); // <-- Add this line
      const liturgicalDates = state.response?.liturgicalDate || [];
      return liturgicalDates.map((liturgicalDate, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return { liturgicalDate, date };
      });
    }));
    this.getDate(new Date());
  }

  getDate(date: Date){
    const formattedDate = date.toISOString();
    this.store.dispatch(GetReadings({ request: { date: formattedDate } }));
  }
}
