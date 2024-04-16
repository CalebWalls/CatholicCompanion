import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DailyReflectionsState } from 'src/app/store/daily-reflections/daily-relflections.reducer';
import { AppState } from 'src/app/app.state';
import { GetDailyUpdates } from 'src/app/store/daily-reflections/daily-relflections.actions';

@Component({
  selector: 'app-liturgicalDate',
  templateUrl: './liturgicalDate.component.html',
  styleUrls: ['./liturgicalDate.component.css']
})
export class LiturgicalDateComponent implements OnInit {
  date = new Date();
  liturgicalDatesWithDate$!: Observable<{ liturgicalDate: string, date: Date }[]>;
    dateState$: Observable<DailyReflectionsState>;
  dateSubscription!: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
    this.dateState$ = this.store.select(state => state.date);
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
    this.store.dispatch(GetDailyUpdates({ request: { date: formattedDate } }));
  }
}
