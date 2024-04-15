import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { GetDailyUpdates } from 'src/app/store/daily-reflections/daily-relflections.actions';
import { DailyReflectionsState } from 'src/app/store/daily-reflections/daily-relflections.reducer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-liturgicalDate',
  templateUrl: './liturgicalDate.component.html',
  styleUrls: ['./liturgicalDate.component.css']
})
export class LiturgicalDateComponent implements OnInit {
  date = new Date();
  liturgicalDate$!: Observable<string>;
  dateState$: Observable<DailyReflectionsState>;
  dateSubscription!: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
    this.dateState$ = this.store.select(state => state.date);
  }

  ngOnInit(): void {
    this.dateState$ = this.store.select(state => state.date);
    this.liturgicalDate$ = this.dateState$.pipe(map(state => {
      console.log('Selected state:', state); // <-- Add this line
      return state.response || '';
    }));    this.date = new Date();
    setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.getDate(this.date);
  }

  getDate(date: Date){
    const formattedDate = date.toISOString();
    this.store.dispatch(GetDailyUpdates({ request: { date: formattedDate } }));
  }
}